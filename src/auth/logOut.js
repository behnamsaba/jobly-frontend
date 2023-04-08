import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import UserContext from "./UserContext";

const LogOut = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(UserContext);

  useEffect(() => {
    logOut();
    navigate("/");
  }, [logOut, navigate]);

  return null;
};

export default LogOut;
