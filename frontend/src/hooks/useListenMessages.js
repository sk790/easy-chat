import { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notification from "../assets/sound/notification.mp3";
const useListenMessages = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      const sound = new Audio(notification);
      sound.play()
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage"); //
  }, [socket, messages, setMessages]);
};

export default useListenMessages;
