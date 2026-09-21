import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("trackstack_user")) || null
  );

  const login = async (username, password) => {
    const response = await api.post("/auth/login", null, {
      params: {
        username,
        password,
      },
    });

    const { access_token } = response.data;

    localStorage.setItem("trackstack_token", access_token);

    const userResponse = await api.get("/auth/me");

    localStorage.setItem(
      "trackstack_user",
      JSON.stringify(userResponse.data)
    );

    setUser(userResponse.data);

    return userResponse.data;
  };

  const signup = async (username, email, password) => {
    const response = await api.post("/auth/signup", {
      username,
      email,
      password,
    });

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("trackstack_token");
    localStorage.removeItem("trackstack_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}