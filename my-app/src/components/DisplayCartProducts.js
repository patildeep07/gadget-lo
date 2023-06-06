import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

export const DisplayCartProducts = ({ product }) => {
  const { title, categoryName, price, rating, inCart, inWishlist, qty, _id } =
    product;
  const {
    handleQuantity,
    removeFromCart,
    addToWishlist,
    removeFromWishlist,
    isInCart,
    isInWishlist,
  } = useContext(AppContext);
  return (
    <div
      style={{ border: "1px solid lightgray", margin: "10px", padding: "10px" }}
    >
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
