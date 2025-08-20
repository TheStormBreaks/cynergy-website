"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserRole = 'student' | 'faculty' | null;

interface AuthContextType {
  userRole: UserRole;
  login: (role: 'student' | 'faculty') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userRole, setUserRole] = useState<UserRole>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole === 'student' || storedRole === 'faculty') {
      setUserRole(storedRole);
    }
  }, []);

  const login = (role: 'student' | 'faculty') => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole');
  };

  return (
    <AuthContext.Provider value={{ userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
