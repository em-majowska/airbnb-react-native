import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const token = await AsyncStorage.getItem("aut");
      const id = await AsyncStorage.getItem("aui");
      token && setUserToken(token);
      id && setUserId(id);
    };
    loadToken();
  }, []);

  const login = async (token, id) => {
    setUserToken(token);
    setUserId(id);
    await AsyncStorage.setItem("aut", token);
    await AsyncStorage.setItem("aui", id);
  };
  const logout = async () => {
    setUserToken(null);
    setUserId(null);
    await AsyncStorage.removeItem("aut");
    await AsyncStorage.removeItem("aui");
  };

  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        userToken: userToken,
        login: login,
        logout: logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
