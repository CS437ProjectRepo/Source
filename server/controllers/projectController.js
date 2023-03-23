const mongoose = require("mongoose");
const Project = mongoose.model("ProjectModel");
const { MESSAGES, HTTP_STATUS_CODES } = require("../utils/server.constants");
const getGithubLanguages = require("../utils/helper");

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({createdAt: 'desc'});
    return res.status(HTTP_STATUS_CODES.OK).json({ projects });
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getFavoriteProjects = async (req, res) => {
  try {
    const favoriteProjects = await Project.find({ favorite: true }).sort({createdAt: 'desc'});
    return res.status(HTTP_STATUS_CODES.OK).json({ favoriteProjects });
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const createProject = async (req, res) => {
  const {project_name, semester, semesterYear, instructor, description, team, documentation, favorite, } = req.body;

  try {
    const existingProject = await Project.findOne({project_name: project_name});
    if (existingProject) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: MESSAGES.PROJECT_ALREADY_EXIST });
    }
    const { website, github, pivitol_tracker } = req.body;

    if (github) {
        let programming_languages = await getGithubLanguages(github);
        const newProject = Project({
          project_name,
          semester,
          semesterYear,
          instructor,
          description,
          team,
          documentation,
          favorite,
          website,
          github,
          pivitol_tracker,
          programming_languages,
        });
        await newProject.save();
        return res
          .status(HTTP_STATUS_CODES.OK)
          .json({ message: MESSAGES.PROJECT_CREATED });
        
    }

    const newProject = Project({
      project_name,
      semester,
      semesterYear,
      instructor,
      description,
      team,
      documentation,
      favorite,
      website,
      github,
      pivitol_tracker,
    });
    await newProject.save();
    return res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: MESSAGES.PROJECT_CREATED });
  } catch (error) {
    if (error.message === MESSAGES.INVALID_GITHUB_LINK ) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: MESSAGES.INVALID_GITHUB_LINK });
    }
    if(error.message === MESSAGES.NOT_FOUND_OR_PRIVATE) {
      return res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .json({error : MESSAGES.NOT_FOUND_OR_PRIVATE})
    }
    if (error.name === "ValidationError") {
      console.log(error.message)
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: MESSAGES.INVALID_PROJECT_FIELDS });
    }
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR});
  }
};

const updateProject = async (req, res) => {
  const { project_name } = req.body;
  try {
    const project = await Project.findOne({project_name: project_name})
    if(!project){
      return res
      .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ error: MESSAGES.PROJECT_DOES_NOT_EXIST });
    }
    const { _id } = project
    let newData = (({ _id, __v, ...o }) => o)(req.body);
    //validate the github link
    if(req.body.hasOwnProperty("github")) {
      const {github} = req.body
      let programming_languages = await getGithubLanguages(github)
      newData = {
          ...newData,
          programming_languages
        }
    }
    await Project.findByIdAndUpdate(_id, newData);
    return res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: MESSAGES.PROJECT_UPDATED });
  } catch (error) {
    if (error.message === MESSAGES.INVALID_GITHUB_LINK ) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: MESSAGES.INVALID_GITHUB_LINK });
    }
    if(error.message === MESSAGES.NOT_FOUND_OR_PRIVATE) {
      return res
      .status(HTTP_STATUS_CODES.NOT_FOUND)
      .json({error : MESSAGES.NOT_FOUND_OR_PRIVATE})
    }
    if (error.name === "ValidationError") {
      console.log(error.message)
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: MESSAGES.INVALID_PROJECT_FIELDS });
    }
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR});
  }
};

module.exports = {
  getAllProjects,
  getFavoriteProjects,
  createProject,
  updateProject,
};
