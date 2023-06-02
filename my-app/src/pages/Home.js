import { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { AppContext } from "../components/AppProvider";

export const Home = () => {
  const { categoryData, setAllData } = useContext(AppContext);
  return (
    <div className="layout">
      <div className="landing-slide">
        <div className="landing-content-layer">
          <Link to="/store">
            <button>Visit Store</button>
          </Link>
        </div>
      </div>
      <h1>Show all categories</h1>
      <div className="category-slide">
        {categoryData.map((category) => {
          const { _id, categoryName, description } = category;
          return (
            <Link to="/store">
              <div
                key={_id}
                className="category-box"
                onClick={() =>
                  setAllData({
                    type: "UPDATE_CATEGORY_HOME",
                    payload: categoryName,
                  })
                }
              >
                <h3>{categoryName}</h3>
                <p>{description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
