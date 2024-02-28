import { React, useEffect, useState } from "react";
import toast from "react-hot-toast";
const useGetFriendRequests = () => {
  const [loading, setLoading] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    const getFriendRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/getfriendrequest");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        // console.log(data);
        toast.success(data.length + " friend requests");
        setFriendRequests(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getFriendRequests();
  }, [setLoading, setFriendRequests]);
  return { loading, friendRequests };
};

export default useGetFriendRequests;
