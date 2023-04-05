import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { MinusIcon, PlusIcon} from '@heroicons/react/20/solid'


const projectData = [
  { id: '12', name: 'Card 1', semester: "Spring 2020", instructor:"Elentukh",  
    description: 'TeeTime is a',
    teamMembers: [
      "Ryan Alto",
      "Christopher Dara",
      "Jaspreet Kaur",
      "Vernon Weathersby",
      "Shannon Zhang"
  ],
  tags: ['python', 'education', 'CSS', 'miscellaneous',],
   },
  { id: '23', name: 'Card 2',
  description: 'facilitates the finding,',
    teamMembers: [
      "Ryan Alto",
      "Christopher Dara",
      "Jaspreet Kaur",
      "Vernon Weathersby",
      "Shannon Zhang"
  ],
  tags: ['python', 'education']},
  { id: '34',  name: 'Card 3', description: 'This is the third card', tags: ['CSS', 'miscellaneous'] },
  { id: '45',  name: 'Card 4', description: 'This is the first card', tags: ['python', 'education'] },
  { id: '56',  name: 'Card 5', description: 'This is the second card', tags: ['HTML', 'java'] },
  { id: '67',  name: 'Card 6', description: 'This is the third card', tags: ['CSS', 'miscellaneous'] },
  { id: '78',  name: 'Card 7', description: 'This is the first card', tags: ['python', 'education'] },
  { id: '89',  name: 'Card 8',  description: 'This is the second card', tags: ['HTML', 'java'] },
  { id: '90',  name: 'Card ', description: 'This is the third card', tags: ['CSS', 'miscellaneous'] },
];

const filters = [
  {
    id: 'featured',
    name: 'Featured',
    options: [
      { value: 'outstanding-ui', label: 'Outstanding UI', checked: false },
      { value: 'outstanding-report', label: 'Outstanding Report', checked: false },
      { value: 'outstanding-testing', label: 'Outstanding Testing', checked: false },
    ],
  },
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'software-engineering', label: 'Software Engineering', checked: false },
      { value: 'education', label: 'Education', checked: false },
      { value: 'travel', label: 'Travel', checked: false },
      { value: 'productivity-&-organization', label: 'Productivity & Organization', checked: false },
      { value: 'fitness-&-health', label: 'Fitness & Health', checked: false },
      { value: 'event-planning', label: 'Event Planning', checked: false },
      { value: 'social-networking', label: 'Social Networking', checked: false },
      { value: 'miscellaneous', label: 'Miscellaneous', checked: false },
    ],
  },
  {
    id: 'languages',
    name: 'Languages',
    options: [
      { value: 'javascript', label: 'Javascript', checked: false },
      { value: 'java', label: 'Java', checked: false },
      { value: 'python', label: 'Python', checked: false },
      { value: 'PHP', label: 'PHP', checked: false },
      { value: 'HTML/CSS', label: 'HTML/CSSL', checked: false },
      { value: 'no-code', label: 'No Code', checked: false },
    ],
  },
]
function FilterMenu({ options, catagory, selectedOptions, onChange }) {
  const handleOptionChange = (optionValue) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter(value => value !== optionValue)
      : [...selectedOptions, optionValue];
      onChange(newSelectedOptions);
   };

   console.log(catagory);
      
      return (
        <Disclosure as="div" className="border-b border-gray-200 py-6">
        {({ open }) => (
          <>
            <h3 className="-my-3 flow-root">
              <Disclosure.Button className="flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-800">{catagory}</span>
                <span className="ml-6 flex items-center">
                  {open ? (
                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                  )}
                </span>
              </Disclosure.Button>
            </h3>
            <Disclosure.Panel className="pt-6">
              <div className="space-y-4">
                {options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <label key={option.value} className="flex items-center">
                   <input
                     type="checkbox"
                     className="form-checkbox h-5 w-5 text-purple-600"
                     value={option.value}
                     checked={selectedOptions.includes(option.value)}
                     onChange={() => handleOptionChange(option.value)}
                   />
                   <span className="ml-2 text-gray-700">{option.label}</span>
                 </label>
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
}

export default function Cards() {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    language: [],
    year: [],
  });
  
  const filteredCards = projectData.filter(card => {
    const { category, language, year } = selectedFilters;
    const tags = card.tags;
    
    return (
      (category.length === 0 || category.some(tag => tags.includes(tag))) &&
      (language.length === 0 || language.some(tag => tags.includes(tag))) &&
      (year.length === 0 || year.some(tag => tags.includes(tag)))
    );
  });

  const handleFilterChange = (filterType, filterValue) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: filterValue,
    }));
  };

  return (
    <>
      {/* Filter menu */}
      <div className="flex space-x-4">
        <FilterMenu
          options={filters[0].options}
          catagory={filters[0].name}
          selectedOptions={selectedFilters.category}
          onChange={(filterValue) => handleFilterChange('category', filterValue)}
        />
        <FilterMenu
          options={filters[1].options}
          catagory={filters[1].name}
          selectedOptions={selectedFilters.language}
          onChange={filterValue => handleFilterChange('language', filterValue)}
        />
        <FilterMenu
          options={filters[2].options}
          catagory={filters[2].name}
          selectedOptions={selectedFilters.year}
          onChange={filterValue => handleFilterChange('year', filterValue)}
        />
      </div>

      {/* Filtered cards */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredCards.map(card => (
          <div key={card.name} className="bg-white rounded-md shadow-md p-4">
            <h2 className="text-lg font-medium">{card.name}</h2>
            <p className="mt-2">{card.description}</p>
            <div className="flex space-x-2 mt-2">
              {card.tags.map(tag => (
                <span key={tag} className="bg-gray-200 px-2 py-1 rounded-full text-sm">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
