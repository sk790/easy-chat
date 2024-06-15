import React, { useContext, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessagesContainer from "../../components/messages/MessagesContainer";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  const {authUser} = useContext(AuthContext)
  useEffect(()=>{
    if(!authUser){
      navigate('/login')
    }
  },[authUser])
  return (
    <div className="w-full h-full flex rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <div className="w-1/2">
        <Sidebar />
      </div>
      <MessagesContainer />
    </div>
  );
};

export default Home;
