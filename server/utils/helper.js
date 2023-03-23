const { URL } = require("url");
const axios = require("axios");
const { MESSAGES, HTTP_STATUS_CODES } = require("../utils/server.constants");

const getGithubLanguages = async (githubLink) => {
  //make sure we got a valid url
  const urlObject = new URL(githubLink);
  const isGithubLink = urlObject.hostname === "github.com" || urlObject.hostname === "www.github.com";
  if (!isGithubLink) {
    throw new Error(MESSAGES.INVALID_GITHUB_LINK);
  }

  const pathName = urlObject.pathname;
  const [, owner, repo] = pathName.split("/");
  if (!owner || !repo) {
    throw new Error(MESSAGES.INVALID_GITHUB_LINK);
  }
  
  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/languages`);
    return Object.keys(response.data).length > 0 ? Object.keys(response.data) : []
  } catch (error) {
    throw new Error(MESSAGES.NOT_FOUND_OR_PRIVATE)
  }
};

module.exports = getGithubLanguages;
