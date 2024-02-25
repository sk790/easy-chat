import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
  const { conversation } = useGetConversation();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {!conversation.error &&
        conversation.map((conversation, lindex) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            lastIndex={lindex === conversation.length - 1}
          />
        ))}
    </div>
  );
};

export default Conversations;
