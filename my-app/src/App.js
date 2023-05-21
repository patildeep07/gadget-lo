import "./App.css";
import Mockman from "mockman-js";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Cart } from "./pages/Cart";
import { Wishlist } from "./pages/Wishlist";
import { Profile } from "./pages/Profile";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/store" element={<Store />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/mockman" element={<Mockman />}></Route>
        <Route path="*" element={<h1>This page doesn't exist...</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;
