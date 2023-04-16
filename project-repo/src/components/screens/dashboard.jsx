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
      adminData && 
      (<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="items-baseline border-b border-gray-400 pt-10 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-800">Hello, Admin {adminData.email} 👋</h1>
        <p className="text-sm mt-2 text-gray-800"> This is the admin dashboard where you can view your information and get the code to invite new admins</p>
        </div>
       
  
        
      </main>)
    );
  }

export default Dashboard