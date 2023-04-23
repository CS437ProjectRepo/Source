const featured = [
    'Featured',
    'Outstanding UI',
    'Outstanding Report',
    'Outstanding Testing',
]

const categories = [
    'For This Course',
    'Software Engineering', 
    'BU',
    'Business Venture',
    'Games',
    'Productivity & Organization',
    'Fitness & Health', 
    'Social Media', 
    'Miscellaneous'
]

//default hard coded languages, call setLangauges on projectData to expand
let languages = [
    'JavaScript',
    'Java',
    'Python',
    'PHP', 
    'HTML',
    'CSS', 
]


const setLanguages = function(data) {
    return new Promise((resolve, reject) => {
      for (const post of data) {
        for (const language of post.languages) {
          if (!languages.includes(language)) {
            console.log(language);
            languages.push(language);
          }
        }
      } 
      resolve(languages);
    });
  };

const getLanguages = function(){
    return languages
}

const no_code_solutions = [
    'Adalo',
    'Airtable',
    'AppSheet',
    'Bubble',
    'Glide',
    'Squarespace',
    'Wix',
    'Wordpress',
    'Zapier',
    'Other No-Code Platform',
]


module.exports =  {featured, categories, no_code_solutions, setLanguages, getLanguages}