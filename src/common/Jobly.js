import { BrowserRouter, Route, Routes } from "react-router-dom";
import Companies from "../companies/Companies";
import Home from "../Home";
import CompanyDetails from "../companies/CompanyDetails";
import Jobs from "../jobs/Jobs";
import NavBar from "./NavBar";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
import FormProfile from "../profile/FormProfile";
import LogOut from "../auth/logOut";
import ProtectedRoute from "./ProtectedRoute";
import UnProtectedRoute from "./UnprotectedRoute";
import NotFound from "./NotFound";

const Jobly = () => {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />

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

          <Route path='companies' element={<Companies />} />
          <Route path='companies/:handle' element={<CompanyDetails />} />
          <Route path='jobs' element={<Jobs />} />
          
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Jobly;
