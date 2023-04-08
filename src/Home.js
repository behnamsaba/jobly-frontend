import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "./auth/UserContext";
import './Home.css'

const Home = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='Home'>
      {user && <h1>Welcome back to Jobly {user.username}!</h1>}
      {!user && (
        <>
          <h1>Welcome to Jobly!</h1>
          <p>Don't have an account?</p>
          <Link to='/signup'>Join</Link>
        </>
      )}
    </div>
  );
};

export default Home;
