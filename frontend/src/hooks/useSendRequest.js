import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const useSendRequest = () => {
  const [loading, setLoading] = useState(false);

  const sendFriendRequest = async (conversationId) => {
    setLoading(true);
    try {
      console.log("fetch");
      const res = await fetch(
        `/api/sendFriendRequest/${conversationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success(data.message);
    } catch {
      (error) => {
        toast.error(error.message);
      };
    } finally {
      setLoading(false);
    }
  };
  return { sendFriendRequest, loading };
};

export default useSendRequest;
