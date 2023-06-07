import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

export const Checkout = () => {
  const { allData, setAllData } = useContext(AppContext);
  const { cart } = allData;

  const [selectedAddress, setSelectedAddress] = useState(allData.address[0]);

  const cartValue = cart.reduce((acc, { price, qty }) => acc + qty * price, 0);
  const deliveryCharges = 250;
  const totalAmount = cartValue + deliveryCharges;

  const buyNowHandler = () => {
    setAllData({
      type: "PLACE_ORDER",
      payloadAddress: selectedAddress,
      payloadCart: [...cart],
      payloadTotal: totalAmount,
    });
  };

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

          <div>
            {allData.address.map(
              ({
                id: addressId,
                name,
                house,
                city,
                state,
                country,
                pincode,
                mobileNumber,
              }) => {
                return (
                  <div className="flex-row-space-evenly" key={addressId}>
                    <input
                      type="radio"
                      checked={selectedAddress.id === addressId}
                      onChange={(e) => {
                        setSelectedAddress((prev) => ({
                          ...prev,
                          ...allData.address.find(({ id }) => id === addressId),
                        }));
                      }}
                    />
                    <div>
                      <p>Name: {name}</p>
                      <p>
                        Address: {house},{city},{state}
                      </p>
                      <p>
                        Pincode: {pincode},{country}
                      </p>
                      <p>Phone Number: {mobileNumber}</p>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Order summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div>
            <p>Cart Value: INR {cartValue} </p>
          </div>
          <div>
            <p>Delivery charges: INR {deliveryCharges}</p>
          </div>
          <div>
            <p>Total charges: INR {totalAmount}</p>
          </div>
          <div>
            <Link
              onClick={buyNowHandler}
              to="/order-placed"
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
              to="/"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
