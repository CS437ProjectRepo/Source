import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PaperClipIcon, LinkIcon } from '@heroicons/react/20/solid'


export default function ProjectModal(props) {
  return (
    <Transition appear show={props.projectModalIsOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={props.handleModalClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={props.handleModalClose}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-800">
                  {props.card.project_name}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                {props.card.description}
                </p>
                <dl className="mt-6">
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Semester</dt>
                        <dd className="mt-1 text-sm text-gray-800 sm:col-span-2 sm:mt-0">{props.card.semester} {props.card.year}</dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Instructor</dt>
                        <dd className="mt-1 text-sm text-gray-800 sm:col-span-2 sm:mt-0">{props.card.instructor}</dd>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Team Members</dt>
                        <ul class="mt-1 text-sm list-disc pl-4 sm:mt-0 text-gray-800">
                        {props.card.team.map(member => (
                          <li>{member}</li>
                        ))}
                        </ul>
                    </div>
                    <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Tags</dt>
                        <dd className="mt-1 text-sm text-white sm:col-span-2 sm:mt-0 tag-container">
                        {props.card.tags.map(tag => (
                          <span key={tag} className="bg-indigo-500 px-2 py-1 rounded-full text-sm">{tag}</span>
                        ))}
                        </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Documentation</dt>
                        <dd className="mt-1 text-sm text-gray-800 sm:col-span-2 sm:mt-0">
                        <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span className="ml-2 w-0 flex-1 truncate">https://drive.google.com/file/d/{props.card.drive_asset}/view</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <a href={`https://drive.google.com/file/d/${props.card.drive_asset}/view`} rel="noreferrer" target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Visit
                                </a>
                            </div>
                            </li>
                        </ul>
                        </dd>
                    </div>
                    { props.card.github && (<div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Github</dt>
                        <dd className="mt-1 text-sm text-gray-800 sm:col-span-2 sm:mt-0">
                        <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                                <LinkIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span className="ml-2 w-0 flex-1 truncate">{props.card.github}</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <a href={props.card.github} rel="noreferrer" target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Visit
                                </a>
                            </div>
                            </li>
                        </ul>
                        </dd>
                    </div>)}
                    { props.card.pivitol_tracker && (<div className=" px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">Pivitol Tracker</dt>
                        <dd className="mt-1 text-sm text-gray-800 sm:col-span-2 sm:mt-0">
                        <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                            <div className="flex w-0 flex-1 items-center">
                                <LinkIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                <span className="ml-2 w-0 flex-1 truncate">{props.card.pivitol_tracker}</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                                <a href={props.card.pivitol_tracker} rel="noreferrer" target="_blank" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Visit
                                </a>
                            </div>
                            </li>
                        </ul>
                        </dd>
                    </div>)}
                </dl>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

