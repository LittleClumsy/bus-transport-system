import React, { createContext, useContext, useEffect, useState } from 'react';
import AxiosInstance from './AxiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('Token');
      if (token) {
        try {
          const response = await AxiosInstance.get('/users/me/');
          setUser(response.data);
        } catch (error) {
          console.error('Failed to fetch user', error);
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
