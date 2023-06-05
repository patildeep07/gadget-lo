import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const { login, auth, logout } = useContext(AuthContext);

  const [userData, setUserData] = useState({ email: "", password: "" });

  const { isLoggedIn } = auth;

  const navigate = useNavigate();
  const location = useLocation();

  const guestCredentials = {
    email: "adarshbalika@gmail.com",
    password: "adarshbalika",
  };

  const loginHandler = (e) => {
    e.preventDefault();
    if (!userData.email.trim() || !userData.password.trim()) {
      alert("Enter valid input");
    } else {
      login(userData);
      navigate(location?.state?.from?.pathname);
    }
  };

  const guestLoginHandler = (e) => {
    e.preventDefault();
    setUserData(guestCredentials);
    login(guestCredentials);
  };

  return (
    <div>
      {!isLoggedIn && (
        <div>
          <form className="login-form">
            <h1>Login</h1>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                placeholder="test@gmail.com"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                placeholder="******"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              ></input>
            </div>
            <button onClick={loginHandler}>Login</button>
            <button onClick={guestLoginHandler}>Guest Login</button>
            <Link
              to="/signup"
              className="sign-up"
              style={{ textDecoration: "underline" }}
            >
              Create new account
            </Link>
          </form>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <h1>You are logged In</h1>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
};
