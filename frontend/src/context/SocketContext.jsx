import { React, createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnineUsers] = useState([]);
  const { authUser } = useContext(AuthContext);

  // https://easy-chat-siea.onrender.com
  useEffect(() => {
    if (authUser) {
      const socket = io("localhost:5000/", {
        query: { userId: authUser._id },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnineUsers(users);
      });
      return () => socket.close(); // Cleanup function
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);
  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
