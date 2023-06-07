import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { useNavigate } from "react-router-dom";

export const DisplayWishlistProducts = ({ product }) => {
  const { title, _id, thumbnail } = product;
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
    <div className="flex-row-space-evenly">
      <img src={thumbnail}></img>
      <div>
        <h1>{title}</h1>

        {!isInCart(_id) && (
          <button onClick={() => addToCart(product)}>Add to cart</button>
        )}

        {isInCart(_id) && (
          <button onClick={() => removeFromCart(product._id, product)}>
            Remove from cart
          </button>
        )}
        {isInCart(_id) && (
          <button onClick={() => navigate("/cart")}>Go to cart</button>
        )}

        {!isInWishlist(_id) && (
          <button onClick={() => addToWishlist(product)}>
            Add to wishList
          </button>
        )}
        {isInWishlist(_id) && (
          <button onClick={() => removeFromWishlist(product._id, product)}>
            Remove from wishlist
          </button>
        )}
      </div>
    </div>
  );
};
