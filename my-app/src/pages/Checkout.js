import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import { AddressComponent } from "../components/AddressComponent";

export const Checkout = () => {
  const { allData } = useContext(AppContext);
  const { cart } = allData;

  const cartValue = cart.reduce((acc, { price, qty }) => acc + qty * price, 0);
  const deliveryCharges = 250;
  return (
    <div>
      <h1>Checkout</h1>
      <div className="flex-row-space-evenly">
        <div>
          <h3>Cart Details</h3>
          <ol>
            {cart.map(({ title, _id, price, qty }) => (
              <li key={_id}>
                {title} - INR {price} - Qty. {qty}
              </li>
            ))}
          </ol>
          <h3>Select an Address</h3>
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div>
            <p>Cart Value: INR {cartValue} </p>
          </div>
          <div>
            <p>Delivery charges: INR {deliveryCharges}</p>
          </div>
          <div>
            <p>Total charges: INR {cartValue + deliveryCharges}</p>
          </div>
          <div>
            <Link
              style={{
                margin: "5px 10px",
                color: "green",
                fontWeight: "bolder",
              }}
            >
              Buy now
            </Link>
            <Link
              style={{ margin: "5px 10px", color: "red", fontWeight: "bolder" }}
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
