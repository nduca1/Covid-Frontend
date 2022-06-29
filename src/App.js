import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";

import Profile from "./components/Profile/Profile";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import useAuthHooks from "./components/hooks/useAuthHooks";

import CovidData from "./CovidData";

function App() {
  const [user, setUser] = useAuthHooks();

  function logout() {
    window.localStorage.removeItem("jwtToken");
    setUser(null);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Header user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/covid"
            element={
              <PrivateRoute>
                <CovidData />
              </PrivateRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
