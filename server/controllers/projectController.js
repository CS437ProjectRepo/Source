const mongoose = require('mongoose');
const Excel = require('exceljs');
const Post = mongoose.model('Project')
const {MESSAGES, HTTP_STATUS_CODES} = require("../utils/server.constants");
const {getLanguageTags} = require("../utils/helper");
const {createFile, deleteFile} = require("../utils/googleDriveHelper");

const downloadProjects = async (req, res) => {
  try{
    const projects = await Post.find({}, '-_id -__v').sort([['year', -1]]);
    const schemaPaths = Post.schema.paths
    
    const excelWorkbook = new Excel.Workbook();
    const worksheet = excelWorkbook.addWorksheet('Projects')

    /**
     * The columns will be generated using the project schema paths this will allow for future developement if any fields get added to the modul
     */
    worksheet.columns = Object.keys(schemaPaths).filter(path => !['_id','__v', 'drive_asset'].includes(path)).map(path => {
      const header = schemaPaths[path].options.label || path
      return {header, key : path}
     
    })

    /**
     * Insert the data into the excel workbook
     * Some fields have an empty array --> [] so we add some clean up work for the worksheet we will insert an empty "" instead of []
     */
    const projectData = {}
    const maxWidths = {}
    projects.forEach(project => {
      Object.keys(project.toObject()).forEach(key =>{
        if(key ==='tags' || key === 'superlatives' || key === 'team' || key === 'languages'){
          projectData[key] = project[key].length ? project[key].join(', ').replace(/["]/g, '') : ''
        } else {
          projectData[key] = project[key]
        }
        const currentWidth = project[key] ? project[key].toString().length : 10
        maxWidths[key] = Math.max(maxWidths[key] || 10 ,currentWidth + 2)
      })
     worksheet.addRow(projectData)
    })

    //console.log(maxWidths)
    worksheet.columns.forEach(column => {
      const key = column.key;
      column.width = Math.max(column.width, maxWidths[key]);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=projects.xlsx');

    await excelWorkbook.xlsx.write(res);
    res.end()

  } catch(error) {
    console.log(error)
    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({error: MESSAGES.ERROR_GENERATING_PROJECTS_FILE})
  }
};

const allProjects = async(req, res) => {
   try{
    const posts = await Post.find().sort([['year', -1]])
    return res.json({posts});
   } catch(error){
    return res.status(500).json({error: error.message});
   }
}

const singleProject = async(req, res) => {
  const {projectId} = req.query;
  // console.log(projectId);
  try{
   const project = await Post.findById(projectId);
   return res.json({project});
  } catch(error){
   return res.status(500).json({error: error.message});
  }
}


const createProject = async(req, res) => {
  console.log(req.body);
  const files = req;
  const {
    project_name, 
    semester,
    instructor, 
    github, 
    description, 
    team, 
    website, 
    pivitol_tracker, 
    development_type, 
    no_code_solution, 
    category, 
  } = req.body

  let {year, superlatives} = req.body;

  const existingProject = await Post.findOne({project_name: project_name});
  try {
    if (existingProject){
      return res.status(422).json({error: "project with that title already exists"})
    }
    
    let tags = [];
    if(!superlatives) superlatives = [];
    tags.push(category, ...superlatives);

    let languages;
    if(github){
      try{
        languages = await getLanguageTags(github); 
        tags.push(...languages);
      } catch(e){
          return res.status(422).json({error: e.message});
      }
    } else{
      tags.push(no_code_solution)
    }

    let fileId
    let documentation_link;
    try{
      // fileId = await createFile(files[0]);
      fileId = await createFile(files['files'][0]);
      documentation_link = `https://drive.google.com/file/d/${fileId}/view`
    }catch(e){
        return res.status(422).json({error: e.message});
    }

    // console.log(tags);
    
    const post = new Post({
        project_name,
        semester,
        year,
        instructor,
        description,
        languages,
        team,
        drive_asset: fileId,
        drive_link: documentation_link,
        website,
        github,
        pivitol_tracker,
        development_type,
        no_code_solution,
        category,
        superlatives,
        tags: tags,
    })

    try {
        await post.save();
        return res.status(201).json({message: MESSAGES.PROJECT_CREATED})
    } catch (error) {
        console.log(error)
        if (error.name === "ValidationError") {
          return res.status(422).json({ message: error.message });
        } else {
          return res.status(422).json({ message: error.message });
        }
    }
  } catch (error) {
      console.log(error);
      return res.status(500).json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
  }
}



const updateProject = async (req, res) => {
    const {project_name} = req.body;
    // console.log(req.body);
    try {
      const project = await Post.findOne({project_name: project_name})
      if(!project){
        return res.status(422).json({ error: MESSAGES.PROJECT_DOES_NOT_EXIST });
      }
      const { _id} = project
      const {
        github, 
        category,
        no_code_solution,
      } = req.body

      let {
        superlatives
      } = req.body;

      let fileId;
      let documentation_link
      if(req.file){
        const originalAsset = project.drive_asset;
        deleteProject(originalAsset);
        try{ 
          fileId = await createFile(files['files'][0]);
          documentation_link = `https://drive.google.com/file/d/${fileId}/view`
        }catch(e){
            return res.status(422).json({error: e.message});
        }
      }

      let newData = (({ _id, __v, ...o }) => o)(req.body);
      if(superlatives || github || category){
        let tags = [];
        if(category){
          tags.push(category)
        }else{
          tags.push(project.category)
        }

        // console.log(project.development_type)
        if(development_type){
          project.development_type = development_type
        }
        switch(project.development_type){
          case "Code":{
            let languages;
            if(github){
              try{
                languages = await getLanguageTags(github); 
                tags.push(...languages);
                newData.languages = languages;
              } catch(e){
                  return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({error: e.message});
              }
            }else{
              tags.push(...project.languages)
            }
            break;
          }
          case "No Code": {
            if(no_code_solution){
              tags.push(no_code_solution)
            }else{
              tags.push(project.no_code_solution)
            }
            break;
          }
        }
        
        if(superlatives){
          if(superlatives.includes('empty')){
            newData.superlatives = [];
          } else{
            tags.push(...superlatives);
          }
        } else{
          tags.push(...project.superlatives)
        }

        newData.tags = tags;
        // console.log(tags);
      }

      if(fileId){
        newData.drive_asset = fileId;
        newData.drive_link = documentation_link;
      }

      await Post.findByIdAndUpdate(_id, newData);
      return res.status(HTTP_STATUS_CODES.OK).json({ message: MESSAGES.PROJECT_UPDATED });
    } catch (error) {
      console.log(error);
      return res
        .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
        .json({ error: MESSAGES.INTERNAL_SERVER_ERROR});
    }
  };

const deleteProject = async (req, res) => {
  const {project_name, drive_asset} = req.body;
  if(!project_name) {
    return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({message: MESSAGES.FIELDS_MISSING})
  }

  try {
    const project = await Post.findOneAndDelete({project_name : project_name})
    if(!project){
      return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({error : MESSAGES.PROJECT_DOES_NOT_EXIST})
    }
    
    deleteFile(drive_asset)

    return res.status(HTTP_STATUS_CODES.OK).json({message : MESSAGES.PROJECT_DELETED});
  } catch (error) {
    return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({error : MESSAGES.INTERNAL_SERVER_ERROR})
  }
}


module.exports = {
    allProjects,
    singleProject,
    createProject,
    downloadProjects,
    updateProject,
    deleteProject
}