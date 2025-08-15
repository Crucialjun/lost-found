import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/api';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token'),
  loading: true,
  error: null
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            // Token is still valid
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user: { id: decoded.id }, token }
            });
          } else {
            // Token expired
            localStorage.removeItem('token');
            dispatch({ type: 'LOGOUT' });
          }
        } catch (error) {
          localStorage.removeItem('token');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkToken();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, error: message };
    }
  };

  const register = async (name, email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_ERROR' });
      
      const response = await api.post('/auth/register', { name, email, password });
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, token }
      });
      
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      dispatch({ type: 'SET_ERROR', payload: message });
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError: () => dispatch({ type: 'CLEAR_ERROR' })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
