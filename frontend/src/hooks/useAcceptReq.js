import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
const useAcceptReq = () => {
  // console.log("id",id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const acceptReq = async (id) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/acceptfriendrequest/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    return {
      loading,
      setId,
      acceptReq,
    };
  }, []);
};

export default useAcceptReq;
