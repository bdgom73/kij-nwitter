import React from "react";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import  Nav from "components/Nav";
import Profile from "routes/Profile";

const AppRouter = ({refreshUser, isLoggedIn, user}) => {

  const loggedInHome = () => isLoggedIn ? 
  <>
    <Route path="/" element={<Home user={user}/>}/>
    <Route path="/profile" element={<Profile refreshUser={refreshUser} user={user}/>}/>
  </> : <Route path="/" element={<Auth/>} />

  return (
  <BrowserRouter>
      {isLoggedIn && <Nav user={user}/>}
    <div className='container'>
      <Routes>
        {loggedInHome()}
      </Routes>
    </div>
  </BrowserRouter>
  );

}

export default AppRouter;

