// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import useApi from "./useApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { apiCall } = useApi();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        setIsAuthenticated(true);
      } catch (e) {
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const response = await apiCall("http://localhost:8000/auth/login", "POST", credentials);
      const { access_token } = response;
      if (!access_token) throw new Error("No token received");

      localStorage.setItem("authToken", access_token);
      const decoded = jwtDecode(access_token);
      setUser(decoded);
      setIsAuthenticated(true);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [apiCall]);

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
