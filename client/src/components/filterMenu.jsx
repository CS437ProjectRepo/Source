
import Filter from './filter';

export default function FilterMenu(props){
    return(
     <form className={props.classes}>
        <h2 className='font-semibold text-gray-800'>Filter By</h2>
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
        <button className="text-purple-500 my-4 disabled:text-gray-400 text-sm"
            onClick={props.resetFilters}
            disabled={props.selectedFilters.category.length === 0 && props.selectedFilters.language.length === 0 && props.selectedFilters.featured.length === 0 && props.selectedFilters.nocode.length === 0 }
        >
            Clear All Filters
        </button>

        <div className="mt-6">
            <h2 className='font-semibold text-gray-800 mb-4'>Search By</h2>
            <input 
                type="text"
                onChange={(event)=>{
                    props.setSearch(event.target.value)
                    props.paginate(1)
                }}
                placeholder="Enter Project Name"
                className="bg-transparent text-sm rounded w-full border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-purple-600" />
        </div>
    </form>
    )
}