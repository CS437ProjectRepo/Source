import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/20/solid';

export default function Pagination(props){
    return(
        <>
        <p className="text-center text-gray-500 pt-8 pb-4">
          Viewing <span className="font-bold">{firstProjectIndex}</span> to <span className="font-bold">{lastProjectIndex}</span> of <span className="font-bold">{props.filteredCards.length}</span> Projects
        </p>
        <div className="justify-center flex pb-8"> 
          <button
            className={`mx-3 bg-transparent ${
              currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-indigo-500'
            }`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon className="w-6 h-6"/>
          </button>
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
          <button
            className={`mx-3 bg-transparent mx-1 ${
              currentPage === Math.ceil(props.filteredCards.length / postsPerPage)
                ? 'text-gray-300 cursor-not-allowed'
                : 'text-indigo-500'
            }`}
            onClick={nextPage}
            disabled={currentPage === Math.ceil(props.filteredCards.length / postsPerPage)}
          >
            <ArrowRightIcon className="w-6 h-6"/>
          </button>
        </div>
        </>
    )
}