const axios = require("axios");
const {MESSAGES } = require("../utils/server.constants");

async function getLanguageTags(github) {
    if (!github)
        return;
    
    let languages = [];
    const githubPath = new URL(github).pathname;
    try {
        const languageResponse = await axios.get(`https://api.github.com/repos${githubPath}/languages`);
        if (languageResponse.data != {}) {
            for (const language in languageResponse.data) {
                languages.push(language);
            }
        }
        return languages;
    } catch (error) {
        console.log(error);
        throw new Error(MESSAGES.INVALID_GITHUB_LINK);
    }
}

 module.exports = {
    getLanguageTags
}