import { Link } from "react-router-dom";
import "../App.css";

export const Header = () => {
  return (
    <div className="flex-row">
      <Link to="/" className="link-class">
        GadgetLo
      </Link>
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
        <Link to="/mockman" className="link-class">
          Mockman
        </Link>
      </div>
    </div>
  );
};
