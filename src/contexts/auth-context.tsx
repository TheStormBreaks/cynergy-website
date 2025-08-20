"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type UserRole = 'student' | 'faculty' | null;
type User = {
  uid: string;
  role: UserRole;
} | null;

interface AuthContextType {
  user: User;
  userRole: UserRole;
  login: (role: 'student' | 'faculty') => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This logic mimics checking for a logged-in user.
    // In a real app, this would be an async call to Firebase Auth.
    setLoading(true);
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (role: 'student' | 'faculty') => {
    // For this demo, we'll use fixed UIDs.
    const userData = {
        role,
        uid: role === 'faculty' ? 'faculty-user-01' : 'student-user-01'
    };
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, userRole: user?.role || null, login, logout, loading }}>
      {!loading && children}
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
