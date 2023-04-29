const {MESSAGES , HTTP_STATUS_CODES} = require("./server.constants");

const projectFieldValidation = (req, res, next) => {
    const { body, files } = req;
    const {project_name,  semester, year, instructor, description, team, development_type, github, no_code_solution} = body
    // console.log(req.body);
    if(!project_name || !semester || !year || !instructor || !description || !team || !development_type){
        return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({error: MESSAGES.FIELDS_MISSING})
    }
    switch(development_type){
        case ("Code"):{
            if(!github){
                return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({error: MESSAGES.FIELDS_MISSING + "Github"})
            }
            break;
        }
        case ("No Code"):{
            if(!no_code_solution){
                return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({error: MESSAGES.FIELDS_MISSING + "No-code"})
            }
            break;
        }
        case("Unavailable"):{
            break;
        }
        default:{
            return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({error: MESSAGES.FIELDS_MISSING + development_type})
        }
    }

    if(!files){
        return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({error: MESSAGES.FIELDS_MISSING + "Files"})
    }

    next()
}
const userFieldValidation = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
    return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ error: MESSAGES.FIELDS_MISSING });
    }
    next()
}
 module.exports = {
     projectFieldValidation,
     userFieldValidation
 }
