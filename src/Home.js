import { Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './auth/UserContext';
import Search from './common/Search';
const Home = () => {
    const { user } = useContext(UserContext);
    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-300 p-2'>
            <div className='max-w-md w-full bg-white rounded-lg shadow-md p-6'>
              <Search />
                {user ? (
                    <>
                        <h1 className='text-2xl font-semibold text-center text-teal-500'>
                            Welcome back to Jobly, {user.username}!
                        </h1>
                    </>
                ) : (
                    <>
                        <h1 className='text-2xl font-semibold text-center text-teal-500'>
                            Welcome to Jobly!
                        </h1>
                        <p className='text-center mt-4'>
                            Don't have an account?
                        </p>
                        <div className='text-center mt-6'>
                            <Link
                                to='/signup'
                                className='inline-block px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-teal-500 hover:bg-teal-700'>
                                Join
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
