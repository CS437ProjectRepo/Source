import {featured, categories, no_code_solutions, languages} from '../config/filterOptions'

const setLanguages = function(data) {
  for (const post of data) {
    for (const language of post.languages) {
      if (!languages.includes(language)) {
        languages.push(language);
      }
    }
    
    // if(post.no_code_solution.length > 0  && !no_code_solutions.includes(post.no_code_solution)){
    //   no_code_solutions.push(post.no_code_solution)
    // }
  } 

  const filterOptions = {
    'Featured': featured,
    'Categories': categories,
    'Programming Languages': languages,
    'No Code Solutions': no_code_solutions,
  }

  return filterOptions
};

function createFilterObject(data) {
  const filterOptions = setLanguages(data);
  let filters = [];
  for (let key in filterOptions){
    filters.push(
      {
        name: key,
        options: 
          filterOptions[key].map(option => {
            return {
              value: option,
              label: option,
              checked: false
            };
          })
      }
    )
  }

  return filters;
}


export default createFilterObject;