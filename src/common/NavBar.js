import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../auth/UserContext';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';

const NavBar = () => {
    const { user } = useContext(UserContext);

    return (
        <nav className='bg-slate-100 flex items-center justify-between p-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <NavLink
                    to='/'
                    className='flex items-center'>
                    <img
                        src='logo.png'
                        alt='jobly'
                        className='h-10 mr-4'
                    />
                    <span className='font-semibold text-xl tracking-tight'>
                        Jobly
                    </span>
                </NavLink>
                <NavLink
                        to='/companies'
                        className='text-gray-800 hover:text-blue-500'>
                        Companies
                    </NavLink>
                    <NavLink
                        to='/jobs'
                        className='text-gray-800 hover:text-blue-500'>
                        Jobs
                    </NavLink>

                <div className='flex items-center space-x-4'>
                    {user && (
                        <NavLink
                            to='/profile'
                            className='text-gray-800 hover:text-blue-500'>
                            <CgProfile className='inline h-5 w-5' />
                        </NavLink>
                    )}

                    {user ? (
                        <NavLink
                            to='/logout'
                            className='text-gray-800 hover:text-blue-500'>
                            <AiOutlineLogout className='inline h-5 w-5' />{' '}
                            {user.username}
                        </NavLink>
                    ) : (
                        <NavLink
                            to='/login'
                            className='text-gray-800 hover:text-blue-500'>
                            <AiOutlineLogin className='inline h-5 w-5' /> Sign
                            In
                        </NavLink>
                    )}

                    {!user && (
                        <NavLink
                            to='/signup'
                            className='text-blue-500 hover:text-blue-700'>
                            Sign up
                        </NavLink>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
