import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export const DisplayWishlistProducts = ({ product }) => {
  const { title, categoryName, price, rating, inCart, inWishlist, qty, _id } =
    product;
  const {
    addToCart,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    isInCart,
    isInWishlist,
  } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div
      style={{ border: "1px solid lightgray", margin: "10px", padding: "10px" }}
    >
      <h1>{title}</h1>

      {!isInCart(_id) && (
        <button onClick={() => addToCart(product)}>Add to cart</button>
      )}
      {isInCart(_id) && (
        <button onClick={() => navigate("/cart")}>Go to cart</button>
      )}

      {!isInWishlist(_id) && (
        <button onClick={() => addToWishlist(product)}>Add to wishList</button>
      )}
      {isInWishlist(_id) && (
        <button onClick={() => removeFromWishlist(product._id, product)}>
          Remove from wishlist
        </button>
      )}
    </div>
  );
};
