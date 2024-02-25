import { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setauthUser] = useState(
    JSON.parse(localStorage.getItem("authUser")) || null
  );
  return (
    <AuthContext.Provider value={{ authUser, setauthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
