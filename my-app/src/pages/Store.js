import { useContext } from "react";
import { AppContext } from "../context/AppProvider";
import { DisplayProductCards } from "../components/DisplayProductCards";
import "./Store.css";

export const Store = () => {
  const { productData, allData, setAllData, priceRangeHandler } =
    useContext(AppContext);
  const { storeList } = productData;
  const { filterByPriceLowToHigh, filterByPriceHighToLow } = allData;

  return (
    <div className="flex-row">
      <div className="filters-section">
        <div className="flex-row">
          <h3>FILTERS: </h3>
          <button onClick={() => setAllData({ type: "CLEAR_ALL" })}>
            Clear All
          </button>
        </div>
        {/* For Price */}
        <div>
          <div className="flex-row">
            <h3>PRICE</h3>
            <button onClick={() => setAllData({ type: "CLEAR_PRICE_FILTER" })}>
              Clear
            </button>
          </div>
          <div className="input-div">
            <input
              type="radio"
              id="price-highToLow"
              name="price"
              checked={filterByPriceHighToLow}
              onClick={() => setAllData({ type: "PRICE_HIGH_TO_LOW" })}
            />
            <label htmlFor="price-highToLow">High to Low</label>
          </div>

          <div className="input-div">
            <input
              type="radio"
              id="price-LowtoHigh"
              name="price"
              checked={filterByPriceLowToHigh}
              onClick={() => setAllData({ type: "PRICE_LOW_TO_HIGH" })}
            />
            <label htmlFor="price-LowtoHigh">Low to High</label>
          </div>
          <hr />
        </div>

        {/* For Price Range */}
        <div>
          <div className="flex-row">
            <h3>PRICE RANGE</h3>
            <button onClick={() => setAllData({ type: "CLEAR_PRICE_RANGE" })}>
              Clear
            </button>
          </div>

          <input
            type="range"
            id="price-range"
            min="0"
            max="85000"
            onChange={priceRangeHandler}
            value={allData.filterByPriceRange}
          />
          <div className="flex-row width-200px">
            <p>0</p>
            <p>85K</p>
          </div>
          <hr />
        </div>

        {/* For Categories */}
        <div>
          <div className="flex-row">
            <h3>Categories</h3>
            <button onClick={() => setAllData({ type: "RESET_CATEGORY" })}>
              Reset
            </button>
          </div>

          <div className="input-div">
            <input
              type="checkbox"
              id="category-mobile"
              onChange={() =>
                setAllData({ type: "UPDATE_CATEGORY", payload: "Mobile" })
              }
              checked={
                allData.filterByCategories.includes("Mobile") ? true : false
              }
            />
            <label htmlFor="category-mobile">Mobile</label>
          </div>

          <div className="input-div">
            <input
              type="checkbox"
              id="category-laptop"
              onChange={() =>
                setAllData({ type: "UPDATE_CATEGORY", payload: "Laptop" })
              }
              checked={
                allData.filterByCategories.includes("Laptop") ? true : false
              }
            />
            <label htmlFor="category-laptop">Laptop</label>
          </div>

          <div className="input-div">
            <input
              type="checkbox"
              id="category-television"
              onChange={() =>
                setAllData({ type: "UPDATE_CATEGORY", payload: "Television" })
              }
              checked={
                allData.filterByCategories.includes("Television") ? true : false
              }
            />
            <label htmlFor="category-television">Television</label>
          </div>

          <div className="input-div">
            <input
              type="checkbox"
              id="category-accessories"
              onChange={() =>
                setAllData({ type: "UPDATE_CATEGORY", payload: "Accessories" })
              }
              checked={
                allData.filterByCategories.includes("Accessories")
                  ? true
                  : false
              }
            />
            <label htmlFor="category-accessories">Accessories</label>
          </div>
          <hr />
        </div>

        {/* For ratings */}
        <div>
          <div className="flex-row">
            <h3>Ratings</h3>
            <button onClick={() => setAllData({ type: "CLEAR_RATING" })}>
              Reset
            </button>
          </div>

          <div className="input-div">
            <input
              type="radio"
              id="rating-4+"
              name="rating"
              onChange={() => setAllData({ type: "RATING", payload: 4 })}
            />
            <label htmlFor="rating-4+">4 stars & above</label>
          </div>

          <div className="input-div">
            <input
              type="radio"
              id="rating-3+"
              name="rating"
              onChange={() => setAllData({ type: "RATING", payload: 3 })}
            />
            <label htmlFor="rating-3+">3 stars & above</label>
          </div>

          <div className="input-div">
            <input
              type="radio"
              id="rating-2+"
              name="rating"
              onChange={() => setAllData({ type: "RATING", payload: 2 })}
            />
            <label htmlFor="rating-2+">2 stars & above</label>
          </div>

          <div className="input-div">
            <input
              type="radio"
              id="rating-1+"
              name="rating"
              onChange={() => setAllData({ type: "RATING", payload: 1 })}
              checked={allData.filterByRating === 1 ? true : false}
            />
            <label htmlFor="rating-1+">1 stars & above</label>
          </div>
          <hr />
        </div>
      </div>

      {/* Product cart */}
      <div className="container-products">
        <h2>
          PRODUCTS:{" "}
          <span style={{ fontWeight: "lighter" }}>{storeList.length}</span>
        </h2>
        {storeList.length === 0 && <h2>No products to display</h2>}
        {storeList.length > 0 && (
          <div className="products-section">
            {storeList.map((product) => {
              return <DisplayProductCards item={product} key={product._id} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};
