import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AuthContextProvider from "./context/AuthContextProvider";
import Favourite from "./pages/Favourite";
import PlayMovie from "./pages/PlayMovie";
import SideBar from "./components/SideBar";
import Detail from "./pages/Detail";
import Trailer from "./pages/Trailer";
import Account from "./pages/Account";
import VerifyEmail from "./pages/VerifyEmail";
import Newest from "./pages/Newest";
import Search from "./pages/Search";

function App() {
  /* 
  Instead, on login, you can deliver two tokens: access token and refresh token. Access token should be stored in Javascript memory and Refresh token should be stored in HttpOnly Cookie. Refresh token is used only and only for creating new access tokens - nothing more.

  When user opens new tab, or on site refresh, you need to perform request to create new access token, based on refresh token which is stored in Cookie. 
  */

  return (
    <div className="App relative">
      <AuthContextProvider>
        <SideBar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/favourite" element={<Favourite />} />
          <Route path="/play/:movieID" element={<PlayMovie />} />
          <Route path="/detail/:movieID" element={<Detail />} />
          <Route path="/trailer/:movieID" element={<Trailer />} />
          <Route path="/account" element={<Account />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/newest" element={<Newest />} />
          <Route path="/search" element={<Search />}  />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
