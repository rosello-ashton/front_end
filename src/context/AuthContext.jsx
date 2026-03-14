import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Set base URL once globally
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/user')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('auth_token');
          delete axios.defaults.headers.common['Authorization'];
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Standard login
  const login = async (email, password) => {
    const res = await axios.post('/api/login', { email, password });
    const { token, user } = res.data;
    localStorage.setItem('auth_token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  };

  // Google login
  const googleLogin = async (accessToken) => {
    const res = await axios.post('/api/auth/google', { access_token: accessToken });
    const { token, user } = res.data;
    localStorage.setItem('auth_token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(user);
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post('/api/logout');
    } catch {
      // clear client side anyway
    } finally {
      localStorage.removeItem('auth_token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
