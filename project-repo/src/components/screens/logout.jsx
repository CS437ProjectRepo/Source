import { AuthContext } from '../../App';
import { useContext} from 'react';
import axios from 'axios';


const Logout = function() {
    const { logout } = useContext(AuthContext);
    delete axios.defaults.headers.common['Authorization'];
    logout();
    return (
      <main id="error-page" className="grid min-h-full place-items-center py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">See You Later!</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-800 sm:text-5xl">Logged Out</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">We hope you have a great day</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </a>
            </div>
          </div>
        </main>
    );
  }

export default Logout