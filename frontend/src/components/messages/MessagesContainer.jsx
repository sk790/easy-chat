import { useContext, useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";
import { AuthContext } from "../../context/AuthContext";
const MessagesContainer = () => {
  const { authUser } = useContext(AuthContext);
  const { selectedConversation, setSelectedConversation } = useConversation();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);
  return (
    <div className="md:min-w-[450px] flex flex-col">
      {!selectedConversation ? (
        <NoChatSelected authUser={authUser} />
      ) : (
        <>
          {/* headear */}
          <div className="bg-slate-500 px-4 py-2 mb-2">
            <span className="label-text">To :</span>
            <span className="text-gray-700 px-1 font-bold">
              {selectedConversation?.username}
            </span>
          </div>
          {/* messages */}
          <Messages />
          {/* message input */}
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessagesContainer;

const NoChatSelected = ({ authUser }) => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>{`Welcome ${authUser?.username}`}</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-2xl md:text-6xl text-center" />
      </div>
    </div>
  );
};