
import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    console.log('Attempting login with:', email);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      phone: '+1234567890',
    };
    
    setUser(mockUser);
    return true;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock signup - in real app, this would call an API
    console.log('Attempting signup with:', email, name);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful signup
    const mockUser: User = {
      id: '1',
      email,
      name,
      phone: '',
    };
    
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
