import React, { useContext, useState, createContext } from "react"

const AuthContext = createContext({})

const AuthContextValue = () => {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem("isAuth")))

  const login = () => {
    setIsAuth(true)
    localStorage.setItem("isAuth", true)
  }

  const logout = () => {
    setIsAuth(false)
    localStorage.setItem("isAuth", false)
  }

  return {
    isAuth,
    login,
    logout
  }
}

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={AuthContextValue()}>
      {children}
    </AuthContext.Provider>
  );
};