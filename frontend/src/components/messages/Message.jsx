import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useContext(AuthContext);
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser.user._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const chatProfile = fromMe
    ? authUser.user.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const formaticTime = extractTime(message.createdAt);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={chatProfile} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-whit ${bubbleBgColor}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formaticTime}
      </div>
    </div>
  );
};

export default Message;
