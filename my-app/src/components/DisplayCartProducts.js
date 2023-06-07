import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

export const DisplayCartProducts = ({ product }) => {
  const { title, thumbnail, price, qty, _id } = product;
  const {
    handleQuantity,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    isInCart,
    isInWishlist,
  } = useContext(AppContext);
  return (
    <div className="flex-row-space-evenly">
      <img src={thumbnail}></img>
      <div>
        <h1>{title}</h1>
        <h3>Price: INR {price}</h3>
        <p>
          <button
            onClick={() =>
              qty > 1
                ? handleQuantity(product._id, "decrement")
                : removeFromCart(product._id, product)
            }
          >
            -
          </button>{" "}
          QTY: {qty}{" "}
          <button onClick={() => handleQuantity(product._id, "increment")}>
            +
          </button>
        </p>
        {!isInCart(_id) && <button>Add to cart</button>}
        {isInCart(_id) && (
          <button onClick={() => removeFromCart(product._id, product)}>
            Remove from cart
          </button>
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
