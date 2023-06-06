import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { DisplayCartProducts } from "../components/DisplayCartProducts";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { allData } = useContext(AppContext);
  const { cart } = allData;
  return (
    <>
      <div style={{ border: "1px solid lightgray", padding: "10px" }}>
        <h1>
          Items in Cart :{" "}
          <span style={{ fontWeight: "lighter" }}>({cart.length})</span>{" "}
        </h1>
        <h4>
          Total Price: INR{" "}
          {cart.reduce((acc, { price, qty }) => acc + qty * price, 0)}
        </h4>
        {cart.length > 0 && (
          <div>
            <Link to="/checkout" style={{ textDecoration: "underline" }}>
              Proceed to checkout
            </Link>
          </div>
        )}

        <div>
          <Link to="/wishlist" style={{ textDecoration: "underline" }}>
            Go to Wishlist
          </Link>
        </div>
      </div>
      <div>
        {cart.map((item) => {
          return <DisplayCartProducts key={item._id} product={item} />;
        })}
      </div>
    </>
  );
};
