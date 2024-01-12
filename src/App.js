import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import JoblyApi from './api/api';
import useLocalStorage from './hooks/useLocalStorage';
import LoadingSpinner from './common/LoadingSpinner';
import UserContext from './auth/UserContext';
import Jobly from './common/Jobly';

function App() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useLocalStorage('jobly-token', null);
    const [applicationIds, setApplicationIds] = useState(new Set());
    const [jobs, setJobs] = useState([]);
    const [companies, setCompanies] = useState([]);

    // Function to handle login.
    const login = async (data) => {
        const newToken = await JoblyApi.login(data);
        setToken(newToken);
    };

    // Function to handle logout.
    const logOut = () => {
        setUser(null);
        setToken(null);
        setApplicationIds(new Set());
    };

    // Function to handle user registration.
    const register = async (data) => {
        const newToken = await JoblyApi.signUp(data);
        setToken(newToken);
    };

    // Function to handle profile changes.
    const profileChange = async (username, data) => {
        const updatedUser = await JoblyApi.saveProfile(username, data);
        setUser(updatedUser);
    };

    // Function to check if user has applied to a job.
    const hasAppliedToJob = (id) => applicationIds.has(id);

    // Function to apply to a job.
    const applyToJob = async (id) => {
        if (hasAppliedToJob(id)) return;
        await JoblyApi.applyToJob(user.username, id);
        setApplicationIds(new Set([...applicationIds, id]));
    };
    useEffect(() => {
        async function getGeneralInfo(form) {
            let companies = await JoblyApi.getAllCompanies(form);
            let jobs = await JoblyApi.getAllJobs(form);
            setCompanies(companies);
            setJobs(jobs);
        }
        getGeneralInfo();
    }, []);

    // Effect to load user information.
    useEffect(() => {
        async function getCurrentUser() {
            if (token) {
                try {
                    const { username } = jwt_decode(token);
                    JoblyApi.token = token;
                    const currentUser = await JoblyApi.getCurrentUser(username);
                    setUser(currentUser);
                    setApplicationIds(new Set(currentUser.applications));
                } catch (error) {
                    console.error(
                        'Error in token decoding or user fetching:',
                        error
                    );
                    setUser(null);
                }
            }
            setInfoLoaded(true);
        }

        setInfoLoaded(false);
        getCurrentUser();
    }, [token]);

    // Render loading spinner while data is loading.
    if (!infoLoaded) return <LoadingSpinner />;

    return (
        <div className='max-w mx-auto shadow-lg overflow-hidden'>
            <UserContext.Provider
                value={{
                    user,
                    profileChange,
                    logOut,
                    login,
                    register,
                    applyToJob,
                    hasAppliedToJob,
                    jobs,
                    companies,
                }}>
                <Jobly />
            </UserContext.Provider>
        </div>
    );
}

export default App;
