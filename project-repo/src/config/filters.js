import {featured, categories, no_code_solutions, getLanguages} from './filterOptions'

const filterOptions = {
  'Featured': featured,
  'Categories': categories,
  'Programming Languages': getLanguages(),
  'No Code Solutions': no_code_solutions,
}

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


export default filters;


// export default function createFilterObject(allLanguages){
  // const filterOptions = {
  //   'Featured': featured,
  //   'Categories': categories,
  //   'Programming Languages': allLanguages,
  //   'No Code Solutions': no_code_solutions,
  // }

  // let filters = [];
  // console.log("here")
  // for (let key in filterOptions){
  //   filters.push(
  //     {
  //       id: key.toLowerCase(),
  //       name: key,
  //       options: 
  //         filterOptions[key].map(option => {
  //           return {
  //             value: option,
  //             label: option,
  //             checked: false
  //           };
  //         })
        
  //     }
  //   )
  // }

  // return filters
// }