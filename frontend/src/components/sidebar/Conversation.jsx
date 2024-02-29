import React, { useContext } from "react";
import useConversation from "../../zustand/useConversation";
import { SocketContext } from "../../context/SocketContext";
import { IoMdPersonAdd } from "react-icons/io";
import useSendRequest from "../../hooks/useSendRequest";
import { AuthContext } from "../../context/AuthContext";

const Conversation = ({ conversation, lastIndex }) => {
  const { isFriend } = useContext(AuthContext);
  const { setSelectedConversation, selectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;

  const { sendFriendRequest, loading } = useSendRequest();

  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(conversation?._id);

  const sendRequest = async (e) => {
    e.preventDefault();
    console.log("button");
    // console.log(conversation._id);
    await sendFriendRequest(conversation._id);
  };
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
              src={conversation && conversation.profilePic}
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">
              {conversation && conversation.username}
            </p>
            <span className="text-sm">
              <button
                onClick={sendRequest}
                className="text-2xl hover:text-white transition-all "
              >
                {!loading ? (
                  <IoMdPersonAdd />
                ) : (
                  <span className="loading loading-spinner"></span>
                )}
              </button>
            </span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
