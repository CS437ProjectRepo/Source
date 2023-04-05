import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon} from '@heroicons/react/20/solid'
import apiURL from "../../config/apiURL";
// import axios from 'axios';
import ProjectModal from '../projectModal';

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
    name: 'Programming Languages',
    options: [
      { value: 'JavaScript', label: 'JavaScript', checked: false },
      { value: 'Java', label: 'Java', checked: false },
      { value: 'Python', label: 'Python', checked: false },
      { value: 'PHP', label: 'PHP', checked: false },
      { value: 'HTML', label: 'HTML', checked: false },
      { value: 'CSS', label: 'CSS', checked: false },
      { value: 'ApacheConf', label: 'ApacheConf', checked: false },
    ],
  },
]


const sortOptions = [
  { name: 'Featured', href: '#', current: true },
  { name: 'Most Recent', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function FilterMenu({ options, catagory, selectedOptions, onChange }) {
  const handleOptionChange = (optionValue) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter(value => value !== optionValue)
      : [...selectedOptions, optionValue];
      onChange(newSelectedOptions);
   }; 
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

export default function Browse() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [projectModalIsOpen, setProjectModalIsOpen] = useState(true);
  const [projectData, setProjectData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    language: [],
    featured: [],
  });

  useEffect(() => {
    const apiEndpoint =  apiURL + '/allprojects';

    fetch(apiEndpoint)
      .then(res => res.json())
      .then(data => {setProjectData(data.posts);})
      .catch(error => {
        console.error('Error fetching project data: ', error);
      });
  }, []);

  // useEffect( async function getProjectData() {
  //   const apiEndpoint =  apiURL + '/allprojects';
  //   try {
  //     const response = await axios.post(apiEndpoint);
  //     const posts = response.data.posts;
  //     setProjectData(posts)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  useEffect(() => {
    const selectedId = window.location.hash.slice(1);
    const selectedCard = projectData.find(card => card._id === selectedId);
    if (selectedCard) {
      setSelectedCard(selectedCard);
    }
  }, [projectData, selectedCard]);
  
  const filteredCards = projectData.filter(card => {
    const { category, language, featured } = selectedFilters;
    const tags = card.tags;
    
    return (
      (category.length === 0 || category.some(tag => tags.includes(tag))) &&
      (language.length === 0 || language.some(tag => tags.includes(tag))) &&
      (featured.length === 0 || featured.some(tag => tags.includes(tag)))
    );
  });

  const handleFilterChange = (filterType, filterValue) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: filterValue,
    }));
  };

  const handleCardClick = (selectedCard) => {
    setSelectedCard(selectedCard);
    window.location.hash = selectedCard._id;
    setProjectModalIsOpen(true);
  }  

  function handleCloseModal() {
    setSelectedCard(null);
    setProjectModalIsOpen(false);
    window.location.hash = '';
  }

  return (
    <div className="browse">
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200 px-2">
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
                      selectedOptions={selectedFilters.featured}
                      onChange={filterValue => handleFilterChange('featured', filterValue)}
                    />
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-10 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Term Project Repository</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="projects-heading" className="pt-6 pb-24">
            <h2 id="projects-heading" className="sr-only">
              Projects
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h2 className='font-medium'>Filter By</h2>
                {/* {filters.map(filter => (
                    <FilterMenu
                    options={filter.options}
                    catagory={filter.name}
                    selectedOptions={selectedFilters[filter.id]}
                    onChange={filterValue => handleFilterChange(filters.name, filterValue)}
                  />
                ))
                } */}
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
                    onChange={filterValue => handleFilterChange(filters[1].name, filterValue)}
                  />
                  <FilterMenu
                    options={filters[2].options}
                    catagory={filters[2].name}
                    selectedOptions={selectedFilters.featured}
                    onChange={filterValue => handleFilterChange('featured', filterValue)}
                  />
              </form>

              {/* Filtered cards */}
              <div className="lg:col-span-3">
                <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4'>
                {filteredCards.map(card => (
                  <div key={card} className="bg-white rounded-lg shadow-md" onClick={() => handleCardClick(card)}>
                  <div className="p-4 card-header rounded-t">
                    <h2 className="text-lg font-medium">{card.project_name}</h2>
                    <h6 className="text-md cont-medium">{card.semester} / {card.instructor}</h6>
                  </div>
                  
                  <div className="mt-2 mx-4 mb-4 card-body">
                    <p className="mt-2">{card.description}</p>
                    <div className="tag-container mt-4">
                      {card.tags.map(tag => (
                        <span key={tag} className="bg-gray-200 px-2 py-1 rounded-full text-sm">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                ))}
              </div>
              </div>
                
                {selectedCard && (
                  <ProjectModal card={selectedCard} projectModalIsOpen={projectModalIsOpen} handleModalClose={handleCloseModal} />
                )}
            </div>
      </section>
      </main>
    </div>
  );
}
