import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

export const Profile = () => {
  const { auth, logout } = useContext(AuthContext);
  const { user } = auth;
  const { firstName, lastName, email } = user;

  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="profile-div">
      <h1>
        Welcome, {firstName} {lastName}
      </h1>
      <p>Email: {email}</p>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};
