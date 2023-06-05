import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { AppContext } from "../context/AppProvider";

export const Header = () => {
  const { auth } = useContext(AuthContext);
  const { isLoggedIn } = auth;
  const { allData, searchHandler } = useContext(AppContext);

  return (
    <div className="flex-row header">
      <Link to="/" className="link-class">
        GadgetLo
      </Link>
      <input
        className="search-input"
        placeholder="Product name"
        onChange={searchHandler}
        value={allData.filterBySearch}
      />
      <div className="internal-links">
        <Link to="/store" className="link-class">
          Store
        </Link>
        <Link to="/cart" className="link-class">
          Cart
        </Link>
        <Link to="/wishlist" className="link-class">
          Wishlist
        </Link>
        {!isLoggedIn && (
          <Link to="/login" className="link-class">
            Login
          </Link>
        )}
        {isLoggedIn && (
          <Link to="/profile" className="link-class">
            Profile
          </Link>
        )}
      </div>
    </div>
  );
};
