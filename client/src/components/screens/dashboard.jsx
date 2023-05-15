import { AuthContext } from '../../App';
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Navigate, useNavigate} from "react-router-dom";
import { toast } from 'react-toastify';
import apiURL from '../../config/apiURL';

const Dashboard = function() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [adminData, setAdminData] = useState(null);
    const navigate = useNavigate();
    const {isAdminLoggedIn} = useContext(AuthContext);
    useEffect(()=>{
      if(!isAdminLoggedIn){
        return navigate('/login')
      }
    }, [isAdminLoggedIn])

    const fetchData = async () => {
      try {
        const response = await axios.get( apiURL + '/protected');
        const data = await response.data;
        setAdminData(data.user);
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    };
    useEffect(() => {
      fetchData();
    }, []);

    const handleChangePasswordSubmit = async function(event){
      event.preventDefault();

      try {
        const response = await axios.post(process.env.apiURL + '/changepassword', {
          oldPassword,
          newPassword,
        });
        
        if(response.status !== 200){
          throw new Error(response.message);
        }

        await response.data;
        toast.success('Password changed successfully!', { position: 'top-right' });
        navigate('/browse');
  
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    };

    return (
      adminData && (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 overflow-wrap break-words">
          <div className="p-4 mb-4">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Hello, Admin {adminData.email} 👋</h1>
              <p className="text-sm mt-2 text-gray-800 mb-4"> This is the admin dashboard where you can view account information about this web app and change your password</p>
              <hr/>
          </div>
          <div className="bg-white shadow-xl sm:rounded-lg my-4">
            <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Secret Admin Code</h2>
                  <p className="text-sm text-gray-800 mb-2"> This is the code other admins need to create a new account</p>
                  <p className="text-gray-800 input-mask w-100 bg-gray-100 bg-opacity-50 p-2 rounded">{`103292347`}</p>
                </div>
            </div>
          </div> 
          <div className="bg-white shadow-xl sm:rounded-lg">
            <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Google Account</h2>
                  <p className="text-sm text-gray-800 mb-2"> Use this gmail account to manually manage files stored on google drive. This is the master account associated with all accounts used to create this project
                  <br />
                  <a href="https://drive.google.com/drive/folders/1YHDfQNxN9tatehJWb0epepSoS3gYuhhn" className="text-purple-500">https://drive.google.com/drive/folders/1YHDfQNxN9tatehJWb0epepSoS3gYuhhn</a>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <p className="text-gray-800 font-semibold">Username:</p>
                      <p className="text-gray-800">{`CS473.Project.Repo@gmail.com`}</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-800 font-semibold">Password:</p>
                      <p className="text-gray-800 input-mask">123131</p>
                    </div>
                  </div>
                </div>
                <hr className="mb-4"/>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">Github Account</h2>
                  <p className="text-sm text-gray-800 mb-2">Use the github account if you ever need to access/modify the codebase for this project
                  <br />
                  <a href="https://github.com/CS437ProjectRepo/Source" className="text-purple-500">https://github.com/CS437ProjectRepo/Source</a>
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <p className="text-gray-800 font-semibold">Username:</p>
                      <p className="text-gray-800">CS473.Project.Repo@gmail.com</p>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-800 font-semibold">Password:</p>
                      <p className="text-gray-800 input-mask">{`123131`}</p>
                    </div>
                  </div>
                </div>
                <hr className="mb-4"/>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">MongoDB Atlas</h2>
                  <p className="text-sm text-gray-800 mb-2">Use MongoDB Atlas if you ever need to manually access the database. 
                    <br />
                    <a href='https://account.mongodb.com/account/login' className="text-purple-500">https://account.mongodb.com/account/login</a>
                  </p>
                  <p className="text-gray-800 font-semibold">Login with Google</p>
                </div>
                <hr className="mb-4"/>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">Render</h2>
                  <p className="text-sm text-gray-800 mb-2">Use render adjustments need to be made to the hosting, like upgrading from free tier. Our react app was originally hosted as a static site and our server as a Free Tier web service.
                    <br />
                    <a href='https://dashboard.render.com' className="text-purple-500">https://dashboard.render.com</a>
                  </p>
                  <p className="text-gray-800 font-semibold">Login with Google</p>
                </div>
            </div>
          </div>

          <div className="bg-white shadow-xl sm:rounded-lg my-4">
            <div className="p-6">
            <form className="mb-4">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">Change Your Password</h2>
                    <div className="mb-4 grid grid-cols-1">
                      <label htmlFor="oldPassword" className="block text-sm font-medium leading-6 text-gray-800">
                          Old Password
                      </label>
                      <input name="oldPassword" id="oldPassword" type="password" 
                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                       value={oldPassword}
                       onChange={(event)=>{setOldPassword(event.target.value)}}
                      ></input>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="oldPassword" className="block text-sm font-medium leading-6 text-gray-800">
                        New Password <span className="font-light">(must be at least 6 characters long and contain at least one capital letter, one number, and one special character)</span> 
                      </label>
                      <input name="newPassword" id="newPassword" type="password" 
                       className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                       value={newPassword} 
                       onChange={(event)=>{setNewPassword(event.target.value)}}
                      ></input>
                    </div>
                    <button
                    className="rounded-md bg-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                     onClick={handleChangePasswordSubmit}
                    >
                     Change Password
                    </button>
                </form>
            </div>
          </div> 
        </div>   
    ))
}

export default Dashboard