
import Filter from './filter';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function FilterMenu(props){
    return(
     <form className={props.classes}>
        <h2 className='font-semibold text-gray-800'>Filter By</h2>
        <button className="text-purple-500 disabled:text-gray-400 text-sm mb-6"
            onClick={props.resetFilters}
            disabled={props.selectedFilters.category.length === 0 && props.selectedFilters.language.length === 0 && props.selectedFilters.featured.length === 0 && props.selectedFilters.nocode.length === 0 && props.search.length === 0}
        >
            Clear All
        </button>
        <hr />
        <Filter
            options={props.filters[0].options}
            category={props.filters[0].name}
            selectedOptions={props.selectedFilters.category}
            onChange={(filterValue) => props.handleFilterChange('category', filterValue)}
        />
        <Filter
            options={props.filters[1].options}
            category={props.filters[1].name}
            selectedOptions={props.selectedFilters.language}
            onChange={filterValue => props.handleFilterChange('language', filterValue)}
        />
        <Filter
            options={props.filters[2].options}
            category={props.filters[2].name}
            selectedOptions={props.selectedFilters.featured}
            onChange={filterValue => props.handleFilterChange('featured', filterValue)}
        />
        {
            props.filters[3].options.length > 0 && (
                <Filter
                    options={props.filters[3].options}
                    category={props.filters[3].name}
                    selectedOptions={props.selectedFilters.nocode}
                    onChange={filterValue => props.handleFilterChange('nocode', filterValue)}
                />
            )
        }
        <div className="my-8">
            {/* <h2 className='font-semibold text-gray-800 mb-4'>Search By</h2> */}
            <div className='flex items-center border border-gray-200 rounded py-1'>
                <input 
                    type="text"
                    onChange={(event)=>{
                        props.setSearch(event.target.value)
                        props.paginate(1)
                    }}
                    value={props.search}
                    placeholder="Search Project by Name"
                    className="bg-transparent text-sm rounded w-full border-0 text-gray-600 placeholder:text-gray-400 focus:ring-0"
                />
                <MagnifyingGlassIcon className='w-5 h-5 text-gray-400 ml-auto mr-2'/>
            </div>
        </div>
    </form>
    )
}