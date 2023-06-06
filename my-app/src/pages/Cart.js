import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { DisplayCartProducts } from "../components/DisplayCartProducts";

export const Cart = () => {
  const { allData } = useContext(AppContext);
  const { cart } = allData;
  return (
    <>
      <div>
        <h1>
          Items in Cart :{" "}
          <span style={{ fontWeight: "lighter" }}>({cart.length})</span>{" "}
        </h1>
      </div>
      <div>
        {cart.map((item) => {
          return <DisplayCartProducts key={item._id} product={item} />;
        })}
      </div>
    </>
  );
};
