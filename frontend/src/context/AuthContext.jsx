import { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setauthUser] = useState(
    JSON.parse(localStorage.getItem("authUser")) || null
  );
  const [loading, setLoading] = useState(false);
  const [isFriend, setisFriend] = useState(false);
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
      setisFriend(data.isAccepted);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider value={{ authUser, setauthUser, acceptReq, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
