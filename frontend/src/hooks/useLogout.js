import { useState,useContext } from "react";
import { toast } from "react-hot-toast";

import { AuthContext } from "../context/AuthContext";

const useLogout = () => {
  const { setauthUser } = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const logout = async () => {
    setloading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success(data.message);
      localStorage.removeItem("authUser");
      setauthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  return { logout, loading };
};

export default useLogout;
