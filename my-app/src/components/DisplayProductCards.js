import "../App.css";

export const DisplayProductCards = ({ item }) => {
  const { title, categoryName, price } = item;
  return (
    <div className="display-card">
      <h2>{title}</h2>
      <p>Category: {categoryName}</p>
      <h3>Price: Rs. {price} </h3>
      <button>Add to cart</button>
      <button>Add to wishList</button>
    </div>
  );
};
