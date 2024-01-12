import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyList from '../companies/CompanyList';
import Home from '../Home';
import CompanyDetails from '../companies/CompanyDetails';
import Jobs from '../jobs/Jobs';
import NavBar from './NavBar';
import SignUp from '../auth/SignUp';
import Login from '../auth/Login';
import FormProfile from '../profile/FormProfile';
import LogOut from '../auth/logOut';
import ProtectedRoute from './ProtectedRoute';
import UnProtectedRoute from './UnprotectedRoute';
import NotFound from './NotFound';
import SearchResult from './SearchResult';
import Footer from './Footer';

const Jobly = () => {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                    />

                    <Route
                        path='/signup'
                        element={
                            <ProtectedRoute>
                                <SignUp />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path='/login'
                        element={
                            <ProtectedRoute>
                                <Login />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='/logout'
                        element={
                            <UnProtectedRoute>
                                <LogOut />
                            </UnProtectedRoute>
                        }
                    />
                    <Route
                        path='/profile'
                        element={
                            <UnProtectedRoute>
                                <FormProfile />
                            </UnProtectedRoute>
                        }
                    />

                    <Route
                        path='companies'
                        element={<CompanyList />}
                    />
                    <Route
                        path='companies/:handle'
                        element={<CompanyDetails />}
                    />
                    <Route
                        path='jobs'
                        element={<Jobs />}
                    />
                    <Route
                        path='search'
                        element={<SearchResult />}
                    />

                    <Route
                        path='*'
                        element={<NotFound />}
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
};

export default Jobly;
