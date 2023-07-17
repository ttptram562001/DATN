import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { authReducers } from "../reduces/authReduce";
import {
  API_URL,
  LOCAL_STORAGE_ACCESS_TOKEN_NAME,
  LOCAL_STORAGE_REFRESH_TOKEN_NAME,
} from "./constants";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import axiosClient from "../api/axiosClient";
import authApi from "../api/authApi";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducers, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
    role: null,
  });
  // Authenticate user
  const loadUser = async () => {
    dispatch({
      type: "SET_LOADING",
      payload: { isAuthenticated: false, user: null },
    });
    if (localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]) {
      setAuthToken(localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]);
    }
    try {
      const token = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
      const decoded = jwt_decode(token);
      if (decoded) {
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: true,
            user: decoded.sub,
            role: decoded.roles,
          },
        });
      } else
        dispatch({
          type: "SET_STOP_LOAD",
          payload: {
            isAuthenticated: false,
            user: null,
            role: null,
          },
        });
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_NAME);
      localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_NAME);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
          role: null,
        },
      });
    }
  };
  useEffect(() => {
    loadUser();
  }, []);
  
  // login
  const loginUser = async (userForm) => {
    try {
      console.log(userForm);
      const response = await axiosClient.post(`${API_URL}/login?username=${userForm.username}&password=${userForm.password}`);
      console.log(response.data.access_token);

      if (response.data != null) {
        localStorage.setItem(
          LOCAL_STORAGE_ACCESS_TOKEN_NAME,
          response.data.access_token
        );
        localStorage.setItem(
          LOCAL_STORAGE_REFRESH_TOKEN_NAME,
          response.data.refresh_token
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  // register
  const registerUser = async (registerForm) => {
    try {

      const response = await axiosClient.post(`${API_URL}/register?username=${registerForm.username}&password=${registerForm.password}&phone=${registerForm.phone}`);
      if (response.data != null) {
        localStorage.setItem(
          LOCAL_STORAGE_ACCESS_TOKEN_NAME,
          response.data.access_token
        );
        localStorage.setItem(
          LOCAL_STORAGE_REFRESH_TOKEN_NAME,
          response.data.refresh_token
        );
      }
      await loadUser();
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  //logout
  const logoutUser = async () => {
    try {
      if (localStorage[LOCAL_STORAGE_ACCESS_TOKEN_NAME]) {
        localStorage.clear();
        setAuthToken(null);
        dispatch({
          type: "SET_AUTH",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
      return { success: true, message: "Logged out" };
    } catch (error) {
      if (error) return error;
    }
  };

  const authContextData = {
    registerUser,
    loginUser,
    authState,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
