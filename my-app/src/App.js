import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Cart } from "./pages/Cart";
import { Wishlist } from "./pages/Wishlist";
import { Profile } from "./pages/Profile";
import { Header } from "./components/Header";
import { Login } from "./pages/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthProvider";
import { Signup } from "./pages/Signup";
import { SingleItem } from "./pages/SingleItem";
import { Checkout } from "./pages/Checkout";
import { OrderPlaced } from "./pages/OrderPlaced";

// Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { auth } = useContext(AuthContext);
  const { isLoggedIn } = auth;
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/product/:productId" element={<SingleItem />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-placed" element={<OrderPlaced />} />

        {isLoggedIn && <Route path="/cart" element={<Cart />}></Route>}
        {isLoggedIn && <Route path="/wishlist" element={<Wishlist />}></Route>}

        {!isLoggedIn && <Route path="/cart" element={<Login />}></Route>}
        {!isLoggedIn && <Route path="/wishlist" element={<Login />}></Route>}

        {isLoggedIn && <Route path="/profile" element={<Profile />}></Route>}
        {!isLoggedIn && <Route path="/profile" element={<Login />}></Route>}

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<h1>This page doesn't exist...</h1>}></Route>
        <Route path="/mockman" element={<Mockman />}></Route>
      </Routes>

      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
