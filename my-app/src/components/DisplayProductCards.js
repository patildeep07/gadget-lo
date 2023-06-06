import { useContext } from "react";
import "../App.css";
import { AppContext } from "../context/AppProvider";
import { Link, useNavigate } from "react-router-dom";

export const DisplayProductCards = ({ item }) => {
  const {
    title,
    categoryName,
    price,
    rating,
    inCart,
    inWishlist,
    _id,
    thumbnail,
  } = item;
  const { addToCart, addToWishlist, isInCart, isInWishlist } =
    useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="display-card">
      <img src={thumbnail}></img>
      <h2>{title}</h2>
      <p>
        Category: <span style={{ fontWeight: "bold" }}>{categoryName}</span>{" "}
      </p>
      <p>
        Rating: <span style={{ fontWeight: "bold" }}>{rating}</span>{" "}
      </p>
      <h3>Price: Rs. {price} </h3>
      <Link to={`/product/${_id}`} style={{ textDecoration: "underline" }}>
        View Details
      </Link>
      <div className="buttons">
        {!isInCart(_id) && (
          <button onClick={() => addToCart(item)}>Add to cart</button>
        )}
        {isInCart(_id) && (
          <button onClick={() => navigate("/cart")}>Go to cart</button>
        )}

        {!isInWishlist(_id) && (
          <button onClick={() => addToWishlist(item)}>Add to wishList</button>
        )}
        {isInWishlist(_id) && (
          <button onClick={() => navigate("/wishlist")}>Go to wishList</button>
        )}
      </div>
    </div>
  );
};
