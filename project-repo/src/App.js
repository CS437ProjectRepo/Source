import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/navbar';
import Home from './components/screens/home'
import Login from './components/screens/login';
import SignUp from './components/screens/signUp';
import ForgotPassword from './components/screens/forgotPassword';
import Browse from './components/screens/browse';
import Cards from './components/screens/cards';
import Add from './components/screens/add';
import Example from './components/screens/example'
import ErrorPage from './components/screens/errorPage';
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
    path: "/example",
    element: <Example />,
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
    path: "/hey",
    element: <h3>hey</h3>,
  },
];

const router = createBrowserRouter(routes);
const App = () => {
  return (
    <>
      <ToastContainer/>
      <NavBar />
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  );
};


export default App;
