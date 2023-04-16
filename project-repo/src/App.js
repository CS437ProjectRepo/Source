import React, {useState, useEffect} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import NavBar from './components/navbar';
import Home from './components/screens/home'
import Login from './components/screens/login';
import SignUp from './components/screens/signUp';
import ForgotPassword from './components/screens/forgotPassword';
import Browse from './components/screens/browse';
import Dashboard from './components/screens/dashboard';
import Cards from './components/screens/cards';
import Add from './components/screens/add';
import Edit from './components/screens/edit';
import ErrorPage from './components/screens/errorPage';
import Logout from './components/screens/logout';
import './App.css';

const routes =  [
  { 
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  { 
    path: "/browse",
    element: <Browse />,
  },
  { 
    path: "/cards",
    element: <Cards />,
  },
  { 
    path: "/add",
    element: <Add />,
  },
  { 
    path: "/edit",
    element: <Edit />,
  },
  { 
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  { 
    path: "/logout",
    element: <Logout />,
  },
];

export const AuthContext = React.createContext();
const router = createBrowserRouter(routes);
const App = () => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    const storedValue = localStorage.getItem('isAdminLoggedIn');
    return storedValue !== null ? JSON.parse(storedValue) : false;
  });

  const login = () => {
    setIsAdminLoggedIn(true);
    localStorage.setItem('isAdminLoggedIn', JSON.stringify(true));
  };

  const logout = () => {
    setIsAdminLoggedIn(false);
    localStorage.setItem('isAdminLoggedIn', JSON.stringify(false));
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'isAdminLoggedIn') {
        const storedValue = event.newValue;
        setIsAdminLoggedIn(storedValue !== null ? JSON.parse(storedValue) : false);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
  };
  }, []);

  axios.interceptors.request.use(
    (config) => {
      const authToken = sessionStorage.getItem('authToken');
      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <>
    <AuthContext.Provider value={{ isAdminLoggedIn, login, logout }}>
      <ToastContainer/>
      <NavBar />
      <RouterProvider router={router}>
      </RouterProvider>
      </AuthContext.Provider>
    </>
  );
};


export default App;
