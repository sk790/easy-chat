import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const useLogin = () => {
  const { setauthUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const login = async ({ username, password }) => { // (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("authUser", JSON.stringify(data));
      setauthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors( username, password ) {
  if (!username || !password) {
    toast.error("Please provide all the fields");
    return false;
  }
  return true;
}
