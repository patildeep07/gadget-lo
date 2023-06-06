import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppProvider";
import "../App.css";

export const SingleItem = () => {
  const { productId } = useParams();
  const { productData } = useContext(AppContext);
  const { storeList } = productData;

  const productDetails = storeList.filter(({ _id }) => _id === productId);

  const { addToCart, addToWishlist, isInCart, isInWishlist } =
    useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      {storeList.length === 0 && <h1>Loading...</h1>}
      {storeList.length > 0 && (
        <div>
          <h1>You're currently viewing:</h1>
          {productDetails.map((item) => {
            const {
              title,
              thumbnail,
              categoryName,
              price,
              rating,
              inCart,
              inWishlist,
              features,
              _id,
            } = item;
            return (
              <div className="flex-row-space-evenly">
                <img
                  src={thumbnail}
                  style={{ width: "350px", height: "400px" }}
                ></img>
                <div>
                  <h1>{title}</h1>
                  <h3>Price: INR {price}</h3>
                  <p>Category: {categoryName}</p>
                  <p
                    style={{
                      color: rating > 2.5 ? "green" : "red",
                      fontWeight: "bolder",
                    }}
                  >
                    Rating: {rating}
                  </p>
                  <ul>
                    {features.map((item) => (
                      <li key={_id}>{item}</li>
                    ))}
                  </ul>
                  <div className="buttons">
                    {!isInCart(_id) && (
                      <button onClick={() => addToCart(item)}>
                        Add to cart
                      </button>
                    )}
                    {isInCart(_id) && (
                      <button onClick={() => navigate("/cart")}>
                        Go to cart
                      </button>
                    )}

                    {!isInWishlist(_id) && (
                      <button onClick={() => addToWishlist(item)}>
                        Add to wishList
                      </button>
                    )}
                    {isInWishlist(_id) && (
                      <button onClick={() => navigate("/wishlist")}>
                        Go to wishList
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
