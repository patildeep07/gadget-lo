import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { DisplayWishlistProducts } from "../components/DisplayWishlistProducts";

export const Wishlist = () => {
  const { allData } = useContext(AppContext);
  const { wishlist, loading } = allData;
  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <div>
          <div>
            <h1>
              Items in wishlist :{" "}
              <span style={{ fontWeight: "lighter" }}>({wishlist.length})</span>{" "}
            </h1>
          </div>
          <div>
            {wishlist.map((item) => {
              return <DisplayWishlistProducts key={item._id} product={item} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};
