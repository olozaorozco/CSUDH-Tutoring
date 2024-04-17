import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setUser(null);
        return;
      }
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000;

      if (tokenExpiration < now) {
        // Handle token refresh or logout
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
          const res = await api.post("/token/refresh/", {
            refresh: refreshToken,
          });
          if (res.status === 200) {
            localStorage.setItem(ACCESS_TOKEN, res.data.access);
            // Fetch and set user data if token is valid
            const userData = await api.get("/user/");
            setUser(userData.data);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error(error);
          setUser(null);
        }
      } else {
        // Fetch and set user data if token is valid
        const userData = await api.get("/user/");
        setUser(userData.data);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
