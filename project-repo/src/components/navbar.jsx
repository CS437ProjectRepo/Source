import { useState, useContext } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import {Popover } from '@headlessui/react'
import { AuthContext } from '../App'

function Navbar(){
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {isAdminLoggedIn} = useContext(AuthContext);
  return (
    <header className="nav-bg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <p href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">CS 473 Project Repository</span>
            <img className="h-8 w-auto logo-nav" src="https://cdn3.iconfinder.com/data/icons/rounded-folders/64/rounded_folder_label_closed-512.png" alt="" />
          </p>
          {/* <p className="hidden lg:flex  -m-1.5 p-1.5 text-sm font-semibold text-white">&nbsp;&nbsp;CS 473 Project Repository</p> */}
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <a href="/" className="text-sm font-semibold leading-6 text-white">
            Home
            </a>
            <a href="/browse" className="text-sm font-semibold leading-6 text-white">
            Browse
            </a>
          <a href="/about" className="text-sm font-semibold leading-6 text-white">
            About
          </a>
          {isAdminLoggedIn  && (
            <a href="/dashboard" className="text-sm font-semibold leading-6 text-white">
            Dashboard
          </a>
          )}
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {isAdminLoggedIn ? (
          <a href="/logout" className="text-sm font-semibold leading-6 text-white">
            Log out <span aria-hidden="true">&rarr;</span>
          </a>
          ) : (
            <a href="/login" className="text-sm font-semibold leading-6 text-white">
            Admin Log in <span aria-hidden="true">&rarr;</span>
          </a>
        )}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto nav-bg px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">CS 473 Project Repository</span>
              <img
                className="h-8 w-auto logo"
                src="https://cdn3.iconfinder.com/data/icons/rounded-folders/64/rounded_folder_label_closed-512.png"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <a
                  href="/"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Home
                </a>
                <a
                  href="/browse"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Browse
                </a>
                {/* <a
                  href="/search"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Search
                </a> */}
                <a
                  href="/about"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  About
                </a>

                {isAdminLoggedIn  && (
                  <a
                  href="/dashboard"
                  className="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Dashboard
                  </a>
                )}
              </div>
              <div className="py-6">

              {isAdminLoggedIn ? (
                <a
                  href="/logout"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log out
                </a>
                ) : (
                  <a
                  href="/login"
                  className="-mx-3 block rounded-lg py-2.5 px-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Admin Log in
                </a>
              )}
                
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
      <hr />
    </header>
  )
}

export default Navbar;