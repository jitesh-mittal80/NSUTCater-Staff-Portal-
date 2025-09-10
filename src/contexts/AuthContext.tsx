import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  mobile?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy staff credentials
const STAFF_CREDENTIALS = [
  { id: '1', email: 'staff@nsutcater.com', password: 'staff123', name: 'John Doe', role: 'Staff Manager' },
  { id: '2', email: 'admin@nsutcater.com', password: 'admin123', name: 'Jane Smith', role: 'Admin' }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('nsutcater_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    // Accept any email and password combination
    const userData = { 
      id: Date.now().toString(), 
      name: 'Staff Member', 
      email: email, 
      role: 'Staff' 
    };
    setUser(userData);
    localStorage.setItem('nsutcater_user', JSON.stringify(userData));
    return true;
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      // Generate a unique ID for the new user
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        role: 'Staff',
        mobile: userData.mobile
      };
      
      setUser(newUser);
      localStorage.setItem('nsutcater_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nsutcater_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
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