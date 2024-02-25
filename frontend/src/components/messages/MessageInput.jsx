import { React, useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";
const MessageInput = () => {
  const [message, setMessage] = useState("");
  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  };
  return (
    <form className="px-4 my-3" onSubmit={handleSubmit}>
      <div className="w-full relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Type your message"
        />
        <button
          type="submit"
          className="absolute right-2.5 inset-y-0 end-0 flex items-center pe-3"
        >
          {!loading ? <BsSend /> : <span className="loading loading-spinner" />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
