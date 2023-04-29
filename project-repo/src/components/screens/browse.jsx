import { Fragment, useState, useEffect, useContext } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline'
import { ArrowDownTrayIcon, FolderPlusIcon, FunnelIcon, ArrowLongLeftIcon, ArrowLongRightIcon} from '@heroicons/react/20/solid'
import apiURL from "../../config/apiURL";
import {useNavigate } from "react-router-dom";
// import filterData from '../../config/filterData';
import createFilterObject from '../../util/filterObject';
import ProjectModal from '../projectModal';
import Loading from '../loading';
import { AuthContext } from '../../App';
import { Link } from "react-router-dom";
import axios from 'axios';
import MobileFilterMenu from '../mobileFilterMenu';
import FilterMenu from '../filterMenu';


export default function Browse() {
  const [isLoading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [projectModalIsOpen, setProjectModalIsOpen] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    language: [],
    featured: [],
    nocode: [],
  });
  const {isAdminLoggedIn} = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(12)
  const pageNumbers = [];
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([])

  useEffect(() => {
    const getProjectData = async()=>{
      try {
        const response = await axios.get(apiURL + '/allprojects');
        const data = response.data;
        setProjectData(data.posts);
        setFilterData(createFilterObject(data.posts));

      } catch (error) {
        console.error('Error fetching project data: ', error);
      } finally{
        setLoading(false);
      }
    }

    getProjectData();
    if(isAdminLoggedIn){
      setPostsPerPage(postsPerPage - 1)
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
    const { category, language, featured, nocode } = selectedFilters;
    const tags = card.tags;
    
    return (
      (category.length === 0 || category.some(tag => tags.includes(tag))) &&
      (language.length === 0 || language.some(tag => tags.includes(tag))) &&
      (featured.length === 0 || featured.some(tag => tags.includes(tag))) && 
      (nocode.length === 0 || nocode.some(tag => tags.includes(tag)))
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
    //https://blog.stephensorensen.com/download-files-using-fetch
    setLoading(true);
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
    } finally{
      setLoading(false);
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
      nocode: [],
    });
    paginate(1)
  }

  return (
    <div className="browse">
      <div className="absolute inset-x-0 top-0 overflow-hidden pl-[50%] -z-10">
        <img src="https://tailwindui.com/img/beams-basic-transparent.png" alt="" className="-ml-[39rem] w-[113.125rem] max-w-none"/>
      </div>
      <Loading isLoading={isLoading}/>
      {
        filterData.length > 0 && (
          <>
          <MobileFilterMenu
        mobileFiltersOpen={mobileFiltersOpen}
        setMobileFiltersOpen={setMobileFiltersOpen}
        filters={filterData} 
        selectedFilters={selectedFilters} 
        handleFilterChange={handleFilterChange} 
        resetFilters={resetFilters}
      />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between pt-10">
          <h1 className="text-2xl font-bold tracking-tight text-gray-800">Term Project Repository</h1>
          <div className="flex items-center">
          <button
            type="button"
            onClick={() => handleProjectDownLoadClick()}
            className="download-button inline-flex items-center rounded-md px-2 sm:px-4 py-2 text-xs text-gray-800 shadow-sm hover:bg-purple-600"
            >
            <ArrowDownTrayIcon className="mr-2 h-5 w-5" aria-hidden="true" />
            Download as CSV
          </button>

            <button
              type="button"
              className="-m-2 ml-2 sm:ml-4 p-1 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        <p className='leading-6 text-sm mt-2 mb-6 text-gray-600 md:max-w-2xl'>Filter past term projects by featured, categories, programming languages and no code solutions. Click on a project to view details, like its documentation, and copy the link to share it.</p>
        <hr/>
        <section aria-labelledby="projects-heading" className="pt-6 pb-14">
          <h2 id="projects-heading" className="sr-only">
            Projects
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <FilterMenu
              classes="hidden lg:block"
              filters={filterData} 
              selectedFilters={selectedFilters} 
              handleFilterChange={handleFilterChange} 
              resetFilters={resetFilters}
            />

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
                      {card.tags.map((tag, index) => (
                        <span key={index} className="tag px-2 py-1 rounded-full text-sm font-medium">{tag}</span>
                      ))}
                      {
                        card.development_type == "Unavailable" && (
                          <span className="text-gray-600 itallic px-2 py-1 rounded-full text-sm italic"> Development Info Not Available</span>
                        )
                      }
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
          Viewing <span className="font-bold">{firstProjectIndex}</span> to <span className="font-bold">{lastProjectIndex}</span> of <span className="font-bold">{filteredCards.length}</span> Projects
        </p>
        <div className="justify-center flex justify-between pb-8 text-sm"> 
          <button
            className={`mx-3 bg-transparent flex gap-2 mt-2 align-center ${
              currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-purple-500'
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
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-purple-500'
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
                : 'text-purple-500'
            }`}
            onClick={nextPage}
            disabled={currentPage === Math.ceil(filteredCards.length / postsPerPage)}
          >
            Next <ArrowLongRightIcon className="w-5 h-5"/>
          </button>
        </div>
      </main>
          </>
        )
      }
  </div>);
}
