import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect, useContext } from 'react'
import { XMarkIcon, PencilIcon } from '@heroicons/react/24/outline'
import FilterMenu from './filterMenu'
export default function MobileFilters(props){
    return (
        <Transition.Root show={props.mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative lg:hidden" onClose={props.setMobileFiltersOpen}>
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
              enter="transition ease-linear duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-linear duration-300 transform"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => props.setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <FilterMenu
                  classes="mt-4 border-gray-200 px-4" 
                  filters={props.filters} 
                  selectedFilters={props.selectedFilters} 
                  handleFilterChange={props.handleFilterChange} 
                  resetFilters={props.resetFilters}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
      </Dialog>
    </Transition.Root>
    )
}