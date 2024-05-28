import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessagesContainer from "../../components/messages/MessagesContainer";

const Home = () => {
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
