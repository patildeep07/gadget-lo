import { useContext } from "react";
import { AppContext } from "../context/AppProvider";

export const OrderPlaced = () => {
  const { allData } = useContext(AppContext);
  const { orderAddress, orderCart, orderTotal } = allData;
  const { id, name, house, city, state, country, pincode, mobileNumber } =
    orderAddress;
  return (
    <div>
      <h2>Your order has been successfully placed!!!</h2>
      <h3>Order details:</h3>
      <div className="flex-row-space-evenly">
        <div>
          <h4>Items you ordered:</h4>
          <ol>
            {orderCart.map(({ title, _id, price, qty }) => (
              <li key={_id}>
                {title} - INR {price} - Qty. {qty}
              </li>
            ))}
          </ol>
          <p>Total charges: INR {orderTotal} </p>
        </div>
        <div>
          <h4>Address on which you ordered:</h4>
          <p>Name: {name}</p>
          <p>
            Address: {house}, <br /> {city}, {pincode}
          </p>
          <p>State: {state}</p>
          <p>Country: {country}</p>
          <p>Mobile Number: {mobileNumber}</p>
        </div>
      </div>
    </div>
  );
};
