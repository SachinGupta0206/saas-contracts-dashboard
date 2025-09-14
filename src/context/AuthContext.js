import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    // Mock authentication
    if (password === "test123") {
      const mockUser = {
        id: 1,
        username,
        email: `${username}@example.com`,
        name: username.charAt(0).toUpperCase() + username.slice(1),
      };

      const mockToken = "mock-jwt-token-" + Date.now();

      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));

      setUser(mockUser);
      return { success: true };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
