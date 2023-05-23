import { useContext } from "react";
import { AppContext } from "../components/AppProvider";
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
        </div>

        {/* For Categories */}
        <div>
          <h3>Categories</h3>

          <div className="input-div">
            <input type="checkbox" id="category-mobile" />
            <label htmlFor="category-mobile">Mobile</label>
          </div>

          <div className="input-div">
            <input type="checkbox" id="category-laptop" />
            <label htmlFor="category-laptop">Laptop</label>
          </div>

          <div className="input-div">
            <input type="checkbox" id="category-television" />
            <label htmlFor="category-television">Television</label>
          </div>

          <div className="input-div">
            <input type="checkbox" id="category-accessories" />
            <label htmlFor="category-accessories">Accessories</label>
          </div>
        </div>

        {/* For ratings */}
        <div>
          <h3>Ratings</h3>

          <div className="input-div">
            <input type="radio" id="rating-4+" name="rating" />
            <label htmlFor="rating-4+">4 stars & above</label>
          </div>

          <div className="input-div">
            <input type="radio" id="rating-3+" name="rating" />
            <label htmlFor="rating-3+">3 stars & above</label>
          </div>

          <div className="input-div">
            <input type="radio" id="rating-2+" name="rating" />
            <label htmlFor="rating-2+">2 stars & above</label>
          </div>

          <div className="input-div">
            <input type="radio" id="rating-1+" name="rating" />
            <label htmlFor="rating-1+">1 stars & above</label>
          </div>
        </div>
      </div>

      {/* Product cart */}
      <div className="container-products">
        <h2>PRODUCT CART</h2>
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
