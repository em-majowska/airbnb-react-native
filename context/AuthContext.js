import { createContext, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);

  const login = (token) => setUserToken(token);
  const logout = () => setUserToken(null);

  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        userToken: userToken,
        setUserId: setUserId,
        setUserToken: setUserToken,
        login: login,
        logout: logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
