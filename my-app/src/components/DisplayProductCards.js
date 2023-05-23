import "../App.css";

export const DisplayProductCards = ({ item }) => {
  const { title, categoryName, price, rating } = item;
  return (
    <div className="display-card">
      <h2>{title}</h2>
      <p>
        Category: <span style={{ fontWeight: "bold" }}>{categoryName}</span>{" "}
      </p>
      <p>
        Rating: <span style={{ fontWeight: "bold" }}>{rating}</span>{" "}
      </p>
      <h3>Price: Rs. {price} </h3>
      <button>Add to cart</button>
      <button>Add to wishList</button>
    </div>
  );
};
