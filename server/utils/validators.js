const {MESSAGES , HTTP_STATUS_CODES} = require("./server.constants");

const projectFieldValidation = (req, res, next) => {
    const {project_name,  semester, instructor, description, team, documentation} = req.body
    if(!project_name || !semester || !instructor || !description || !team || !documentation){
        return res.status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY).json({error: MESSAGES.FIELDS_MISSING})
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
