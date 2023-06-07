import { createContext, useReducer, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  //   Login Function below

  const login = async (credentials) => {
    try {
      const { status, data } = await axios.post("/api/auth/login", credentials);
      if (status === 200) {
        toast.success("Logged in successfully");
        localStorage.setItem("token", data?.encodedToken);
        authDispatch({ type: "LOG_IN" });
        authDispatch({ type: "SET_USER", payload: data?.foundUser });
        authDispatch({ type: "SET_TOKEN", payload: data?.encodedToken });
        navigate(location?.state?.from?.pathname);
      }
    } catch (error) {
      toast.error("Incorrect id or password");
      authDispatch({ type: "LOG_OUT" });
    }
  };

  //   Signup function below

  const signup = async (credentials) => {
    try {
      const { status, data } = await axios.post(
        "/api/auth/signup",
        credentials
      );

      if (status === 200) {
        toast.success("User created");
        localStorage.setItem("token", data?.encodedToken);
        authDispatch({ type: "LOG_IN" });
        authDispatch({ type: "SET_USER", payload: data?.createdUser });
        authDispatch({ type: "SET_TOKEN", payload: data?.encodedToken });
        navigate(location?.state?.from?.pathname);
      }
    } catch (error) {
      toast.error(error);
      authDispatch({ type: "LOG_OUT" });
    }
  };

  //   Logout function below

  const logout = () => {
    localStorage.removeItem("token");
    authDispatch({ type: "LOG_OUT" });
    authDispatch({ type: "SET_USER", payload: [] });
    authDispatch({ type: "SET_TOKEN", payload: "" });
    navigate("/");
    toast.error("You've been logged out!");
  };

  //   Reducer function below

  const authReducer = (state, action) => {
    switch (action.type) {
      case "LOG_IN":
        return {
          ...state,
          isLoggedIn: true,
        };
      case "LOG_OUT":
        return {
          ...state,
          isLoggedIn: false,
        };
      case "SET_USER":
        return {
          ...state,
          user: action.payload,
        };
      case "SET_TOKEN":
        return {
          ...state,
          token: action.payload,
        };
      default:
        return state;
    }
  };

  const [auth, authDispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: {},
    token: "",
  });

  return (
    <AuthContext.Provider value={{ login, auth, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
