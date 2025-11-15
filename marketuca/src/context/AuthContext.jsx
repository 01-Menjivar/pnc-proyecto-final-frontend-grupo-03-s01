import { createContext, useState, useEffect } from "react";

// Crear contexto
export const AuthContext = createContext();

// Proveedor
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("auth_token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // Actualiza estado al inicio
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken) => {
    localStorage.setItem("auth_token", newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("email");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
