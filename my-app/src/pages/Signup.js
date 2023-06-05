import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";

export const Signup = () => {
  const { signup } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const accountHandler = (e) => {
    e.preventDefault();
    if (
      !userDetails?.firstName.trim() ||
      !userDetails?.lastName.trim() ||
      !userDetails.email.trim() ||
      !userDetails?.password.trim() ||
      !userDetails?.confirmPassword.trim()
    ) {
      alert("Invalid input");
    } else if (userDetails.password !== userDetails.confirmPassword) {
      alert("Passwords are not same");
    } else {
      signup(userDetails);
      navigate("/");
    }
  };

  return (
    <div>
      <form className="signup-form">
        <h1>Signup </h1>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            placeholder="Adarsh"
            value={userDetails.firstName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, firstName: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            placeholder="Balika"
            value={userDetails.lastName}
            onChange={(e) =>
              setUserDetails({ ...userDetails, lastName: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            placeholder="adarshbalika@gmail.com"
            value={userDetails.email}
            onChange={(e) =>
              setUserDetails({ ...userDetails, email: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="*******"
            value={userDetails.password}
            onChange={(e) =>
              setUserDetails({ ...userDetails, password: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="confirm-Password">Confirm Password:</label>
          <input
            id="confirm-Password"
            type="password"
            placeholder="*******"
            value={userDetails.confirmPassword}
            onChange={(e) =>
              setUserDetails({
                ...userDetails,
                confirmPassword: e.target.value,
              })
            }
          />
        </div>

        <button onClick={accountHandler}>Create account!</button>

        <Link to="/login" style={{ textDecoration: "underline" }}>
          Already have an account?
        </Link>
      </form>
    </div>
  );
};
