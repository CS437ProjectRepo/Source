import { Fragment, useState, useEffect, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ArrowDownTrayIcon, FolderPlusIcon, FunnelIcon} from '@heroicons/react/20/solid'
import apiURL from "../../config/apiURL";
// import axios from 'axios';
import filters from '../../config/filters';
import FilterMenu from '../filterMenu';
import ProjectModal from '../projectModal';
import { AuthContext } from '../../App';
import { Link } from "react-router-dom";

export default function Browse() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [projectModalIsOpen, setProjectModalIsOpen] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    language: [],
    featured: [],
  });
  const {isAdminLoggedIn} = useContext(AuthContext);

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
    const selectedCard = projectData.find(project => project._id === selectedId);
    if (selectedCard) {
      setSelectedCard(selectedCard);
      setProjectModalIsOpen(true);
    }

    console.log(selectedId)
    console.log(selectedCard);
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
                    <h2 className="text-lg font-medium text-gray-800">Filters</h2>
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
            <h1 className="text-2xl font-bold tracking-tight text-gray-800">Term Project Repository</h1>

            <div className="flex items-center">
            <button
              type="button"
              className="download-button inline-flex items-center rounded-md px-3 py-2 text-xs text-gray-800 shadow-sm hover:bg-indigo-800"
              >
              <ArrowDownTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Download CSV
            </button>

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
                      onChange={filterValue => handleFilterChange('language', filterValue)}
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
                {isAdminLoggedIn && (
                  <Link to="/add">
                   <div className="add-card rounded-lg  border">
                    <FolderPlusIcon className="text-gray-300"/>
                    <p className='mt-2 text-md text-gray-500'>Add a Project</p>
                   </div>
                  </Link>
                )}
                {filteredCards.map(card => (
                  <div className="bg-white rounded-lg shadow-md card">
                  <div  key={card._id} onClick={() => handleCardClick(card)}>
                    <div className="p-4 card-header rounded-t">
                      <h2 className="text-md font-medium">{card.project_name}</h2>
                      <h6 className="text-md">{card.semester} {card.year} / {card.instructor}</h6>
                    </div>
                    
                    <div className="mt-2 mx-4 mb-4 card-body">
                      <p className="mt-2">{card.description}</p>
                      <div className="tag-container mt-4">
                        {card.tags.map(tag => (
                          <span key={tag} className="tag px-2 py-1 rounded-full text-sm font-medium">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {isAdminLoggedIn && (
                    <div className="card-admin-options">
                      <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm text-gray-600 shadow-sm  border border-dashed border-gray-400"
                      key={card._id + "-edit"}
                      >
                      <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-600" aria-hidden="true" />
                      Edit
                    </button>
                    {/* <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm text-red-500 shadow-sm  border border-red-500"
                      key={card._id + "-delete"}
                      >
                      <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-red-500" aria-hidden="true" />
                      Delete
                    </button> */}
                  </div>
                  )}
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
