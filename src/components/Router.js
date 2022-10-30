import React from "react";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import  Nav from "components/Nav";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn, login}) => {

  const loggedInHome = () => isLoggedIn ? 
  <>
    <Route path="/" element={<Home/>}/>
    <Route path="/" element={<Profile/>}/>
  </> : 
  <Route path="/" element={<Auth login={login}/>} />

  return (
  <BrowserRouter>
      {isLoggedIn && <Nav/>}
      <Routes>
        {loggedInHome()}
      </Routes>
  </BrowserRouter>
  );

}

export default AppRouter;

