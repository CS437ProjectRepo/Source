const axios = require("axios");
const {MESSAGES } = require("../utils/server.constants");

async function appendLanguageTags(github, tags) {
    if (!github)
        return;
    if (!tags)
        tags = [];
    const githubPath = new URL(github).pathname;
    try {
        const languageResponse = await axios.get(`https://api.github.com/repos${githubPath}/languages`);
        if (languageResponse.data != {}) {
            for (const tag in languageResponse.data) {
                tags.push(tag);
            }
        }
        return tags;
    } catch (error) {
        // console.log(error);
        throw new Error(MESSAGES.INVALID_GITHUB_LINK);
    }
}

 module.exports = {
    appendLanguageTags
}