import React, { createContext, useState, useContext, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import apis from './api/apis';

const AuthContext = createContext({ isAuthenticated: false, user: null, login: () => { }, logout: () => { }, updateUser: () =>{} });

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({ isAuthenticated: false, user: null });

  useEffect(() => {
    const savedAuthState = sessionStorage.getItem('authState');
    if (savedAuthState) {
      setAuthState(JSON.parse(savedAuthState));
    }
  }, []);

  const login = async (username, password) => {
    const hash = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    let responseBody
    try {
      const response = await apis.login("login", { username: username, password: hash })
      console.log(response);
      if (response.status === 201) {
        const authData = { isAuthenticated: true, user: username }
        setAuthState(authData);
        sessionStorage.setItem('authState', JSON.stringify(authData));
        responseBody = await response.json();
      } else {
        responseBody = await response.json();
      }
      return { status: response.status, message: responseBody.message, data:  responseBody.user};

    }
    catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (data) => {
    setAuthState({ isAuthenticated: true, user: data });
    const authData = { isAuthenticated: true, user: data }
    await sessionStorage.setItem('authState', JSON.stringify(authData));
  }

  const logout = () => {
    const authData = { isAuthenticated: false, user: null }
    setAuthState(authData);
    sessionStorage.removeItem('authState');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
