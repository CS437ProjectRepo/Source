import { Fragment, useState, useEffect, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline'
import { ArrowDownTrayIcon, FolderPlusIcon, FunnelIcon, ArrowLongLeftIcon, ArrowLongRightIcon} from '@heroicons/react/20/solid'
import apiURL from "../../config/apiURL";
import {useNavigate } from "react-router-dom";
import filters from '../../config/filters';
import FilterMenu from '../filterMenu';
import ProjectModal from '../projectModal';
import { AuthContext } from '../../App';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function Browse() {
  const [loading, setLoading] = useState(true);
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
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(9)
  const pageNumbers = [];
  const navigate = useNavigate();

  useEffect(() => {
    const getProjectData = async()=>{
      try {
        const response = await axios.get(apiURL + '/allprojects');
        const data = response.data;
        setProjectData(data.posts);
      } catch (error) {
        console.error('Error fetching project data: ', error);
      } finally{
        setLoading(false);
      }
    }

    getProjectData();
    if(isAdminLoggedIn){
      setPostsPerPage(8)
    }
  }, [isAdminLoggedIn]);


  useEffect(() => {
    const selectedId = window.location.hash.slice(1);
    const selectedCard = projectData.find(project => project._id === selectedId);
    if (selectedCard) {
      setSelectedCard(selectedCard);
      setProjectModalIsOpen(true);
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
    paginate(1)
  };

  const handleProjectDownLoadClick = async () => {
    console.log('asdasdsa');
    //https://blog.stephensorensen.com/download-files-using-fetch
    const downloadAllProjectEndpoint = apiURL + '/download/projects';
    try {
      const response = await fetch(downloadAllProjectEndpoint, {
        headers: { Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
      });
      const data = await response.blob();
      const url = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;

      link.download = 'projects.xlsx'

      //link.setAttribute('download', 'projects.xlsx');
      //document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)

    } catch (error) {
      console.log(error);
    }
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const firstProjectIndex = indexOfFirstPost + 1;
  const lastProjectIndex = indexOfLastPost > filteredCards.length ? filteredCards.length : indexOfLastPost;
  const currentCards = filteredCards.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  for (let i = 1; i <= Math.ceil(filteredCards.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
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

  function resetFilters(){
   setSelectedFilters({
      category: [],
      language: [],
      featured: [],
    });
    paginate(1)
  }

  return (
    <div className="browse">
      <Transition
      show={loading}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      >
          <div className="fixed inset-0 bg-white bg-opacity-50 z-10 flex justify-center items-center">
              <div role="status">
                  <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>
          </div>
      </Transition>
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
                    <h2 className="text-md font-medium text-gray-800">Filters</h2>
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
                    <button className="text-indigo-500 my-4 disabled:text-gray-400 text-sm"
                      onClick={resetFilters}
                      disabled={selectedFilters.category.length === 0 && selectedFilters.language.length === 0 && selectedFilters.featured.length === 0 }
                    >
                      Clear All Filters
                    </button>
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
            onClick={() => handleProjectDownLoadClick()}
            className="download-button inline-flex items-center rounded-md px-3 py-2 text-xs text-gray-800 shadow-sm hover:bg-indigo-800"
            >
            <ArrowDownTrayIcon className="mr-2 h-5 w-5" aria-hidden="true" />
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

        <section aria-labelledby="projects-heading" className="pt-6 pb-14">
          <h2 id="projects-heading" className="sr-only">
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filters */}
            <form className="hidden lg:block">
              <h2 className='font-medium'>Filter By</h2>
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
                <button className="text-indigo-500 my-4 disabled:text-gray-400 text-sm"
                  onClick={resetFilters}
                  disabled={selectedFilters.category.length === 0 && selectedFilters.language.length === 0 && selectedFilters.featured.length === 0 }
                >
                  Clear All Filters
                </button>
            </form>

            {/* Filtered cards */}
            <div className="lg:col-span-3">
              <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-4'>
              {isAdminLoggedIn && (
                <Link to="/add">
                  <div className="add-card rounded-lg  border">
                  <FolderPlusIcon className="text-gray-300"/>
                  <p className='mt-2 text-sm text-gray-500'>Add a Project</p>
                  </div>
                </Link>
              )}
              {currentCards.map(card => (
                <div className="bg-white rounded-lg shadow-md card text-sm break-words">
                <div  key={card._id} onClick={() => handleCardClick(card)}>
                  <div className="p-4 card-header rounded-t">
                    <h2 className="font-medium">{card.project_name}</h2>
                    <h6>{card.semester} {card.year} / {card.instructor}</h6>
                  </div>
                  
                  <div className="mt-2 mx-4 mb-4 card-body">
                    <p className="mt-2">{card.description}</p>
                    <div className="tag-container mt-4">
                      {card.tags.map((tag) => (
                        <span className="tag px-2 py-1 rounded-full text-sm font-medium">{tag}</span>
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
                    onClick={(e)=>{navigate('/edit', {state: card._id})}}
                    >
                    <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-600" aria-hidden="true" />
                    Edit
                  </button>
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
        <hr/>
        <p className="text-center text-gray-500 pt-8 pb-4 text-sm">
          Viewing <span className="font-medium">{firstProjectIndex}</span> to <span className="font-medium">{lastProjectIndex}</span> of <span className="font-medium">{filteredCards.length}</span> Projects
        </p>
        <div className="justify-center flex justify-between pb-8 text-sm"> 
          <button
            className={`mx-3 bg-transparent flex gap-2 mt-2 align-center ${
              currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-indigo-500'
            }`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ArrowLongLeftIcon className="w-5 h-5"/> Previous
          </button>
          <div className='hidden sm:block'>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`px-4 py-2 rounded-lg mx-1 ${
                number === currentPage
                  ? 'bg-indigo-500 text-white'
                  : 'bg-white text-indigo-500'
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
          </div>
          <button
            className={`mx-3 bg-transparent mt-2 flex gap-2 align-center ${
              currentPage === Math.ceil(filteredCards.length / postsPerPage)
                ? 'text-gray-500 cursor-not-allowed'
                : 'text-indigo-500'
            }`}
            onClick={nextPage}
            disabled={currentPage === Math.ceil(filteredCards.length / postsPerPage)}
          >
            Next <ArrowLongRightIcon className="w-5 h-5"/>
          </button>
        </div>
      </main>
  </div>);
}
