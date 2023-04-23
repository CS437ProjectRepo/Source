import { useState, useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../../App';
import { Navigate, useNavigate } from "react-router-dom";
import { FolderIcon } from '@heroicons/react/24/solid'
import apiURL from '../../config/apiURL';
import { toast } from 'react-toastify';
import { Transition } from '@headlessui/react'
import {featured, categories, no_code_solutions} from '../../config/filterOptions'

export default function Add(){
  const { isAdminLoggedIn } = useContext(AuthContext);

  const [project_name, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [semester, setSemester] = useState('Spring');
  const [year, setYear] = useState(2015);
  const [instructor, setInstructor] = useState('');
  const [development_type, setDevelopmentType] = useState("Code");
  const [github, setGithub] = useState('');
  const [no_code_solution, setNoCode] = useState ('');
  const [website, setWebsite] = useState('');
  const [pivitol_tracker, setPivitolTracker] = useState('');
  const [category, setCategory] = useState('For This Course');
  const [team, setTeam] = useState([]);
  const [superlatives, setSuperlatives] = useState([]); 
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  if(!isAdminLoggedIn){
    return <Navigate to="/login" />;
  }

  function getYear(){
    return new Date().getFullYear();
  }

  function handleCancelClick(){
    navigate('/browse');
  }


  const handleDevelopmentTypeChange = (event) => {
    const curr = event.target.value;
    setDevelopmentType(curr);
  }

  const handleTeamMembersChange = (event) => {
    const inputText = event.target.value;
    const membersList = inputText.replace(/\s{2,}/g, ' ').split(",")
    .map((member) => member.trim())
    .filter((member) => member !== "");
    setTeam(membersList);
  };

  function handleCategoryChange(event) {
    const category = event.target.value;
    setCategory(category)
  }

  function handleSuperlativeChange(event) {
    const superlative = event.target.getAttribute("name");
    if (event.target.checked) {
      setSuperlatives([...superlatives, superlative]);
    } else {
      setSuperlatives(superlatives => superlatives.filter(tag => tag !== superlative));
    }
  }


  async function handleFormSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData();
    formData.append("project_name", project_name);
    formData.append("description", description);
    formData.append("instructor", instructor);
    formData.append("semester", semester);
    formData.append("year", year);
    for(let i=0; i<team.length;i++){
      formData.append("team[]", team[i]);
    }
    formData.append("development_type", development_type);
    formData.append("github", github);
    formData.append("no_code_solution", no_code_solution);
    formData.append("pivitol_tracker", pivitol_tracker);
    formData.append("website", website);
    formData.append("category", category);
    for(let i=0; i<superlatives.length;i++){
      if(superlatives[i].length > 0){
        formData.append("superlatives[]", superlatives[i]);
      }
    }
    formData.append("file", file);
  
    try {
      const response = await axios.post(apiURL + '/createproject', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      toast.success(response.data.message, { position: 'top-right' });
      navigate('/browse')
    } catch (error) {
      const message = error.response.data.error;
      if(message){
        toast.error(message, { position: 'top-right' });
      }
      else{
        toast.error("Error posting project. Check console for more information", { position: 'top-right' });
        console.log(error);
      }
    }finally{
      setLoading(false);
    }
  }
  

  return (
    <div className="isolate bg-white px-6 py-10 sm:py-16 lg:px-8 ">
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

    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">Add a New Project</h2>
      {/* <p className="mt-2 text-lg leading-8 text-gray-600">
        Aute magna irure deserunt veniam aliqua magna enim voluptate.
      </p> */}
    </div>
    <form className="mx-auto max-w-2xl" onSubmit={handleFormSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-800/10 pb-12">

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="project-name" className="block text-sm font-medium leading-6 text-gray-800">
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
                  required
                  value={project_name}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-800">
                Description*
              </label>
              <p className="text-sm leading-6 text-gray-600">The project scope statement (Max 500 characters)</p>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={6}
                  maxLength={500}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="file-upload" className="block text-sm font-medium leading-6 text-gray-800">
                Upload Documentation*
              </label>
              <p className="text-sm leading-6 text-gray-600">Attach documentation that is associated with this project</p>
              <div className="mt-2 justify-center rounded-lg border border-dashed border-gray-500 px-6 py-10">
                {file ? (
                  <div className="text-center">
            <div className="mb-4">
            <div className="flex justify-center">
                <FolderIcon className="mx-auto my-5 h-12 w-12 text-gray-300" aria-hidden="true" />
              </div>
              <p className="text-sm text-gray-600 break-words">{file.name}</p>
              <button
                type="button"
                onClick={() =>setFile(null)}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                Attach a different file
              </button>
            </div>
          </div>
          ) : (
          <div className="text-center">
                  <FolderIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only"
                      required
                      onChange={e => setFile(e.target.files[0])}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">Up to 10MB</p>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-800/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-800">Project Information</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">More information about this project</p>
          
          <div className="col-span-full mt-6">
              <label htmlFor="instructor-last" className="block text-sm font-medium leading-6 text-gray-800">
                Instructor Last Name*
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="instructor-last"
                  id="instructor-last"
                  autoComplete="instructor-last"
                  maxLength={100}
                  required
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="semester-semester" className="block text-sm font-medium leading-6 text-gray-800">
                Semester*
              </label>
              <div className="mt-2">
              <select
                  id="semester-semester"
                  name="semester-semester"
                  autoComplete="semester-semester"
                  required
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="Spring" >Spring</option>
                  <option value="Summer" >Summer</option>
                  <option value="Fall" >Fall</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="year" className="block text-sm font-medium leading-6 text-gray-800">
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
                  required
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="team-members" className="block text-sm font-medium leading-6 text-gray-800">
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
              <label htmlFor="developmentType-type" className="block text-sm font-medium leading-6 text-gray-800">
                Development Type*
              </label>
              <div className="mt-2">
              <select
                  id="developmentType-type"
                  name="developmentType-type"
                  autoComplete="developmentType-type"
                  onChange={handleDevelopmentTypeChange}
                  value={development_type}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="Code">Code</option>
                  <option value="No Code">No Code</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>

            {development_type === "Code" ? (
              <div className="sm:col-span-3">
                <label htmlFor="github" className="block text-sm font-medium leading-6 text-gray-800">
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
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            ) :( development_type === "No Code" && (
              <div className="sm:col-span-3">
                <label htmlFor="no-code-platform" className="block text-sm font-medium leading-6 text-gray-800">
                  No-Code Platform*
                </label>
                <div className="mt-2">
                  <select
                    id="no-code-platform"
                    name="no-code-platform"
                    autoComplete="no-code-platform"
                    value={no_code_solution}
                    onChange={(e) => setNoCode(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                  {
                    no_code_solutions.map((solution) => (
                      <option value={solution}>{solution}</option>
                    ))
                  }
                  </select>
                </div>
              </div>
            )
            )}

            <div className="sm:col-span-3">
              <label htmlFor="pivitol-tracker" className="block text-sm font-medium leading-6 text-gray-800">
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
                  value={pivitol_tracker}
                  onChange={(e) => setPivitolTracker(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-800">
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
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-800/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-800">Superlatives</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose from the following superlatives so that the projects can be filtered
          </p>

          <div className="mt-5 space-y-10 mx-10">
          <div className="col-span-full">
              <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-800">
                Category*
              </label>
              <p className="text-sm text-gray-500">Select the category that this project most closely belongs to:</p>
              <div className="mt-6">
                <select
                  name="category"
                  id="category"
                  autoComplete="category"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={category}
                  onChange={handleCategoryChange}
                >
                {
                  categories.map((solution) => (
                    <option value={solution}>{solution}</option>
                  ))
                }
                </select> 
                  
              </div>
            </div> 

            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-800">Superlatives</legend>
              <p className="text-sm text-gray-500"> Other students should look to this project as an example for:</p>
              <div className="mt-6 space-y-6">
              {
                featured.map((feature) => (
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id={feature}
                        name={feature}
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        // value={superlatives.indexOf("Outstanding UI") !== -1}
                        onChange={(event) => {handleSuperlativeChange( event)}}
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label htmlFor="outstanding-UI" className="font-medium text-gray-800">
                        {feature}
                      </label>
                    </div>
                  </div>
                ))
              }
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-800"
        onClick={handleCancelClick}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
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
    </div>
  )
}
