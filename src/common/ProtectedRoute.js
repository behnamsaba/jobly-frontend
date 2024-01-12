import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../auth/UserContext';

//user access routes

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserContext);
    if (user) {
        return (
            <Navigate
                to='/'
                replace
            />
        );
    }

    return children;
};

export default ProtectedRoute;
