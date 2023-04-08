import Jobly from "./common/Jobly";
import UserContext from "./auth/UserContext";
import JoblyApi from "./api/api";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import useLocalStorage from "./hooks/useLocalStorage";
import LoadingSpinner from "./common/Loading";
import './App.css'
function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage("jobly", null);
  const [applicationIds, setApplicationIds] = useState(new Set([]));

  //login - logout - register - update
  const login = async (data) => {
    const token = await JoblyApi.login(data);
    setToken(token);
    console.log(token);
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    setApplicationIds(new Set([]));
  };

  const register = async (data) => {
    const token = await JoblyApi.signUp(data);
    setToken(token);
  };

  const profileChange = async (username, data) => {
    let changedUser = await JoblyApi.saveProfile(username, data);
    setUser(changedUser);
  };

  //apply to job - check already applied

  const hasAppliedToJob = (id) => {
    return applicationIds.has(id);
  };

  const applyToJob = (id) => {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(user.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  };

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt_decode(token);
          JoblyApi.token = token; //must put token inside api , unless we get error when trying to get user (compare token)
          let user = await JoblyApi.getCurrentUser(username);
          setUser(user);
          setApplicationIds(new Set(user.applications));
        } catch (e) {
          console.log("cant do it");
          setUser(null);
        }
      }

      setInfoLoaded(true);
    }

    getCurrentUser();
  }, [token]);

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className='App'>
      <UserContext.Provider
        value={{
          user,
          profileChange,
          logOut,
          login,
          register,
          applyToJob,
          hasAppliedToJob,
        }}>
        <Jobly />
      </UserContext.Provider>
    </div>
  );
}

export default App;
