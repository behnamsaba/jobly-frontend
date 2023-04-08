import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../auth/UserContext";

//Public Access

const UnProtectedRoute = ({ children }) => {
  const {user} = useContext(UserContext);
  if (!user) {

    return <Navigate to="/" replace />;
  }

  return children;
};

export default UnProtectedRoute;
