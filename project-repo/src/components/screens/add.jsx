import { useState, useContext } from 'react'
import { AuthContext } from '../../App';
import { Navigate } from "react-router-dom";
import { FolderIcon } from '@heroicons/react/24/solid'

export default function Add(){
  const { isAdminLoggedIn } = useContext(AuthContext);
  const [developmentType, setDevelopmentType] = useState("code");
  const [teamMembers, setTeamMembers] = useState([]);
  const [tags, setTags] = useState([]);

  if(!isAdminLoggedIn){
    return <Navigate to="/login" />;
  }

  function getYear(){
    return new Date().getFullYear();
  }

  const handledevelopmentTypeChange = (event) => {
    const curr = event.target.value;
    setDevelopmentType(curr);
  }

  const handleTeamMembersChange = (event) => {
    const inputText = event.target.value;
    const membersList = inputText.split(",").map((member) => member.trim());
    setTeamMembers(membersList);
  };

  function handleCategoryChange(event) {
    const category = event.target.value;
    setTags(tags => [...tags, category]);
  }

  function handleSuperlativeChange(event) {
    const superlative = event.target.id;
    if (event.target.checked) {
      setTags(tags => [...tags, superlative]);
    } else {
      setTags(tags => tags.filter(tag => tag !== superlative));
    }
  }



  return (
    <div className="isolate bg-white px-6 py-10 sm:py-16 lg:px-8 ">
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add a New Project</h2>
      {/* <p className="mt-2 text-lg leading-8 text-gray-600">
        Aute magna irure deserunt veniam aliqua magna enim voluptate.
      </p> */}
    </div>
    <form className="mx-auto max-w-2xl">
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="project-name" className="block text-sm font-medium leading-6 text-gray-900">
                Project Name*
              </label>
              <p className="text-sm leading-6 text-gray-600">Please Note: The project name cannot be modified once it is created</p>
              <div className="mt-2">
                <input
                  type="text"
                  name="project-name"
                  id="project-name"
                  autoComplete="project-name"
                  maxLength={100}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description*
              </label>
              <p className="text-sm leading-6 text-gray-600">The project scope statement (Max 500 characters)</p>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={6}
                  maxLength={500}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                  defaultValue={''}
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-900">
                Upload Documentation*
              </label>
              <p className="text-sm leading-6 text-gray-600">Attach documentation that is associated with this project</p>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900 px-6 py-10">
                <div className="text-center">
                  <FolderIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">Up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Project Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">More information about this project</p>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="semester-semester" className="block text-sm font-medium leading-6 text-gray-900">
                Semester*
              </label>
              <div className="mt-2">
              <select
                  id="semester-semester"
                  name="semester-semester"
                  autoComplete="semester-semester"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="spring" >Spring</option>
                  <option value="summer" >Summer</option>
                  <option value="fall" >Fall</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-900">
                Year*
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  placeholder={getYear()}
                  min={2015}
                  max={getYear()}
                  name="semester-year"
                  id="semester-year"
                  autoComplete="semester-year"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="team-members" className="block text-sm font-medium leading-6 text-gray-900">
                Team Members*
              </label>
              <p className="text-sm leading-6 text-gray-600">Enter team member names, separated by a comma</p>
              <div className="mt-2">
                <input
                  type="text"
                  name="team-members"
                  id="team-members"
                  autoComplete="team-members"
                  onChange={handleTeamMembersChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="developmentType-type" className="block text-sm font-medium leading-6 text-gray-900">
                Development Type*
              </label>
              <div className="mt-2">
              <select
                  id="developmentType-type"
                  name="developmentType-type"
                  autoComplete="developmentType-type"
                  onChange={handledevelopmentTypeChange}
                  value={developmentType}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="code">Code</option>
                  <option value="no-code">No-Code</option>
                </select>
              </div>
            </div>

            {developmentType === "code" && (
              <div className="sm:col-span-3">
                <label htmlFor="github" className="block text-sm font-medium leading-6 text-gray-900">
                  Github*
                </label>
                <div className="mt-2">
                  <input
                    placeholder="https://github.com/CS437ProjectRepo"
                    type="text"
                    name="github"
                    id="github"
                    autoComplete="github"
                    maxLength={500}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}
            {developmentType === "no-code" && (
              <div className="sm:col-span-3">
                <label htmlFor="no-code-platform" className="block text-sm font-medium leading-6 text-gray-900">
                  No-Code Platform*
                </label>
                <div className="mt-2">
                  <select
                    id="no-code-platform"
                    name="no-code-platform"
                    autoComplete="no-code-platform"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option value="adalo">Adalo</option>
                    <option value="airtable">Airtable</option>
                    <option value="appSheet">AppSheet</option>
                    <option value="bubble">Bubble</option>
                    <option value="glide">Glide</option>
                    <option value="squarespace">Squarespace</option>
                    <option value="wix">Wix</option>
                    <option value="wordpress">Wordpress</option>
                    <option value="zapier">Zapier</option>
                    <option value="no-code">Other No-Code Platform</option>
                  </select>
                </div>
              </div>
            )}

            <div className="sm:col-span-3">
              <label htmlFor="pivitol-tracker" className="block text-sm font-medium leading-6 text-gray-900">
                Pivitol Tracker
              </label>
              <div className="mt-2">
                <input
                  placeholder="https://www.pivotaltracker.com/n/projects/2627613"
                  type="text"
                  name="pivitol-tracker"
                  id="pivitol-tracker"
                  autoComplete="pivitol-tracker"
                  maxLength={500}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                Website
              </label>
              <div className="mt-2">
                <input
                  placeholder="https://anshitakhare.com"
                  type="text"
                  name="website"
                  id="website"
                  autoComplete="website"
                  maxLength={500}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Tags</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose from the following tags so that the projects can be filtered
          </p>

          <div className="mt-5 space-y-10 mx-10">
          <div className="col-span-full">
              <label htmlFor="catagory" className="block text-sm font-medium leading-6 text-gray-900">
                Catagory*
              </label>
              <p className="text-sm text-gray-500">Select the catagory that this project most closely belongs to:</p>
              <div className="mt-6">
                <select
                  name="catagory"
                  id="catagory"
                  autoComplete="catagory"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleCategoryChange}
                >
                  <option value="software-engineering">Software Engineering</option>
                  <option value="education">Education</option>
                  <option value="travel">Travel</option>
                  <option value="productivity-&-organization">Productivity & Organization</option>
                  <option value="fitness-&-health">Fitness & Health</option>
                  <option value="event-planning">Event Planning</option>
                  <option value="social-networking">Social Networking</option>
                  <option value="miscellaneous">Miscellaneous</option>
                </select> 
                  
              </div>
            </div> 

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Superlatives</legend>
              <p className="text-sm text-gray-500"> Other students should look to this project as an example for:</p>
              <div className="mt-6 space-y-6">
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="outstanding-UI"
                      name="outstanding-UI"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={handleSuperlativeChange}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="outstanding-UI" className="font-medium text-gray-900">
                      Outstanding UI
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="outstanding-report"
                      name="outstanding-report"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={handleSuperlativeChange}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="outstanding-report" className="font-medium text-gray-900">
                      Outstanding Report
                    </label>
                  </div>
                </div>
                <div className="relative flex gap-x-3">
                  <div className="flex h-6 items-center">
                    <input
                      id="outstanding-testing"
                      name="outstanding-testing"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      onChange={handleSuperlativeChange}
                    />
                  </div>
                  <div className="text-sm leading-6">
                    <label htmlFor="outstanding-testing" className="font-medium text-gray-900">
                      Outstanding Testing
                    </label>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div
      className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      aria-hidden="true"
    >
      <div
        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </div>
  )
}
