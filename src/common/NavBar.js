import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useContext } from "react";
import UserContext from "../auth/UserContext";

const NavBar = () => {
  const { user } = useContext(UserContext);

  return (
    <nav className="NavBar">
      <NavLink to='/'>Jobly</NavLink>
      <NavLink to='/companies'>Companies</NavLink>
      <NavLink to='/jobs'>Jobs</NavLink>
      {user && <NavLink to='/profile'>Profile</NavLink>}
      {user ? (
        <NavLink to='/logout'>Exit {user.username}</NavLink>
      ) : (
        <NavLink to='/login'>Login</NavLink>
      )}
      {!user && <NavLink to='/signup'>Sign up</NavLink>}
    </nav>
  );
};

export default NavBar;
