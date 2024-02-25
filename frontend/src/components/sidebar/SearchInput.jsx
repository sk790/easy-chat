import { React, useState } from "react";
import { IoSearch } from "react-icons/io5";
import useGetConversation from "../../hooks/useGetConversation";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
const SearchInput = () => {
  const [inputs, setInputs] = useState("");
  const { conversation } = useGetConversation();
  const { setSelectedConversation } = useConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputs) return;

    const filteredConversation = conversation.filter((c) => {
      return c.username.toLowerCase().includes(inputs.toLowerCase());
    });
    if (filteredConversation.length > 0) {
      setSelectedConversation(filteredConversation[0]);
    } else {
      toast.error("User Not Found!");
    }
    setInputs("");
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setInputs(e.target.value)}
        value={inputs}
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearch />
      </button>
    </form>
  );
};

export default SearchInput;
