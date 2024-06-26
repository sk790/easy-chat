import { useState, useContext } from "react";
import "./App.css";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "./context/AuthContext";
import { Navigate } from "react-router-dom";
import FriendRequests from "./pages/notification/FriendRequests";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <>
      <div className="h-screen flex items-center p-4 justify-center">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <SignUp />}
          />
          <Route path="/notifications" element={<FriendRequests />} />
        </Routes>
      </div>
      <Toaster />
    </>
  );
}

export default App;
