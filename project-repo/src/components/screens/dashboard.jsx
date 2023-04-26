import { AuthContext } from '../../App';
import { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { Navigate} from "react-router-dom";
import { toast } from 'react-toastify';

const Dashboard = function() {
    const { isAdminLoggedIn } = useContext(AuthContext);
  
    const [adminData, setAdminData] = useState(null);

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5050/protected');
        const data = await response.data;
        setAdminData(data.user);
        console.log(adminData)
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message, { position: 'top-right' });
      }
    };

    
    useEffect(() => {
      fetchData();
    }, []);

    if(!isAdminLoggedIn){
      return <Navigate to="/login" />;
    }

    return (
      adminData && (
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 overflow-wrap break-words">
          <div className="bg-white shadow-xl sm:rounded-lg">
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-2 text-gray-800">Hello, Admin {adminData.email} 👋</h1>
              <p className="text-sm mt-2 text-gray-800 mb-4"> This is the admin dashboard where you can view your information</p>
              <hr className="mb-4"/>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Secret Admin Code</h2>
                  <p className="text-sm text-gray-800 mb-2"> This is the code other admins need to create a new account</p>
                  <p className="text-gray-800 input-mask">{`103292347`}</p>
                </div>
                <hr className="mb-4"/>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Google Account</h2>
                  <p className="text-sm text-gray-800 mb-2"> Use this gmail account to manually manage files stored on google drive. This is the master account associated with all accounts used to create this project
                  <br />
                  <a href="https://drive.google.com/drive/folders/1YHDfQNxN9tatehJWb0epepSoS3gYuhhn" className="text-indigo-500">https://drive.google.com/drive/folders/1YHDfQNxN9tatehJWb0epepSoS3gYuhhn</a>
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
                  <a href="https://github.com/CS437ProjectRepo/Source" className="text-indigo-500">https://github.com/CS437ProjectRepo/Source</a>
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
                    <a href='https://account.mongodb.com/account/login' className="text-indigo-500">https://account.mongodb.com/account/login</a>
                  </p>

                  <p className="text-gray-800 font-semibold">Login with Google</p>
                  
                </div>
            </div>
          </div>
        </div>   
    ))
}

export default Dashboard