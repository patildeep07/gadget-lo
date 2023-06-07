import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Loading data
  const [productData, setProductData] = useState({
    productList: [],
    storeList: [],
  });

  // Category Data
  const [categoryData, setCategoryData] = useState([]);

  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { isLoggedIn } = auth;

  // Default Address

  const defaultAddress = [
    {
      id: 1,
      name: "Deep Patil",
      house: "A3, Flat: 904 , Indus Valley",
      city: "Thane",
      state: "Maharashtra",
      country: "India",
      pincode: "400605",
      mobileNumber: "9876543210",
    },
  ];

  const getData = async () => {
    try {
      const { status: productStatus, data: dataProducts } = await axios.get(
        "api/products"
      );

      if (productStatus === 200) {
        setProductData({
          ...productData,
          productList: [...dataProducts.products],
          storeList: [...dataProducts.products],
        });
        setAllData({ type: "LOADING_FALSE" });
      }

      const { status: categoryStatus, data: dataCategories } = await axios.get(
        "api/categories"
      );

      if (categoryStatus === 200) {
        setCategoryData([...dataCategories.categories]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //   useReducer Functions

  const reducerFunc = (state, action) => {
    switch (action.type) {
      case "PRICE_HIGH_TO_LOW":
        return {
          ...state,
          filterByPriceHighToLow: !state.filterByPriceHighToLow,
          filterByPriceLowToHigh: false,
        };
      case "PRICE_LOW_TO_HIGH":
        return {
          ...state,
          filterByPriceHighToLow: false,
          filterByPriceLowToHigh: !state.filterByPriceLowToHigh,
        };
      case "CLEAR_PRICE_FILTER":
        return {
          ...state,
          filterByPriceHighToLow: false,
          filterByPriceLowToHigh: false,
        };
      case "PRICE_RANGE":
        return {
          ...state,
          filterByPriceRange: action.payload,
        };
      case "CLEAR_PRICE_RANGE":
        return {
          ...state,
          filterByPriceRange: 99999,
        };
      case "RATING":
        return {
          ...state,
          filterByRating: action.payload,
        };
      case "CLEAR_RATING":
        return {
          ...state,
          filterByRating: 1,
        };
      case "CLEAR_ALL": {
        return {
          ...state,
          filterByPriceLowToHigh: false,
          filterByPriceHighToLow: false,
          filterByPriceRange: 99999,
          filterByRating: 1,
          filterByCategories: [],
          filterBySearch: "",
        };
      }
      case "UPDATE_CATEGORY":
        return {
          ...state,
          filterByCategories: state.filterByCategories.includes(action.payload)
            ? [
                ...state.filterByCategories.filter(
                  (item) => item !== action.payload
                ),
              ]
            : [...state.filterByCategories, action.payload],
        };
      case "UPDATE_CATEGORY_HOME":
        return {
          ...state,
          filterByCategories: [action.payload],
        };
      case "RESET_CATEGORY":
        return {
          ...state,
          filterByCategories: [],
        };
      case "INPUT_SEARCH":
        return {
          ...state,
          filterBySearch: action.payload,
        };
      case "SET_CART_ITEMS":
        return {
          ...state,
          cart: action.payload,
        };
      case "SET_WISHLIST_ITEMS":
        return {
          ...state,
          wishlist: action.payload,
        };
      case "SET_USER_ADDRESS":
        return {
          ...state,
          address: [...state?.address, action.payload],
        };
      case "DELETE_USER_ADDRESS":
        return {
          ...state,
          address: state?.address.filter(({ id }) => id !== action.payload),
        };
      case "EDIT_ADDRESS":
        return {
          ...state,
          address: state?.address?.map((addressItem) =>
            addressItem.id === action.payload
              ? { ...addressItem, isEdit: true }
              : addressItem
          ),
        };
      case "SAVE_ADDRESS":
        return {
          ...state,
          address: state.address.map((addressItem) =>
            addressItem.id === action.payload[1]
              ? { ...action.payload[0] }
              : addressItem
          ),
        };
      case "CANCEL_ADDRESS":
        return {
          ...state,
          address: state.address.map((addressItem) =>
            addressItem.id === action.payload
              ? { ...addressItem, isEdit: false }
              : addressItem
          ),
        };
      case "DELETE_ADDRESS":
        return {
          ...state,
          address: state?.address?.map(
            (addressItem) => addressItem.id !== action.payload
          ),
        };
      case "PLACE_ORDER":
        return {
          ...state,
          orderAddress: action.payloadAddress,
          orderCart: action.payloadCart,
          orderTotal: action.payloadTotal,
        };
      case "LOADING_FALSE":
        return {
          ...state,
          loading: false,
        };
      default:
        return { ...state };
    }
  };

  const [allData, setAllData] = useReducer(reducerFunc, {
    filterByPriceLowToHigh: false,
    filterByPriceHighToLow: false,
    filterByPriceRange: 99999,
    filterByRating: 1,
    filterByCategories: [],
    filterBySearch: "",
    cart: [],
    wishlist: [],
    address: defaultAddress,
    orderAddress: [],
    orderCart: [],
    orderTotal: 0,
    loading: true,
  });

  // Destructuring data

  const {
    filterByPriceHighToLow,
    filterByPriceLowToHigh,
    filterByPriceRange,
    filterByRating,
    filterByCategories,
    filterBySearch,
    cart,
    wishlist,
  } = allData;

  const encodedToken = localStorage.getItem("token");

  // Cart Handler here

  const getCart = async (encodedToken) => {
    try {
      const response = await axios.get("/api/user/cart", {
        headers: {
          authorization: encodedToken,
        },
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const setCart = async () => {
    try {
      const cartResponse = await getCart(encodedToken);

      if (cartResponse.status === 200) {
        setAllData({
          type: "SET_CART_ITEMS",
          payload: cartResponse?.data?.cart,
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const addToCart = async (givenProduct) => {
    try {
      if (isLoggedIn) {
        const { status, data } = await axios.post(
          "/api/user/cart",
          {
            product: { ...givenProduct },
          },
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );

        if (status === 201) {
          setAllData({ type: "SET_CART_ITEMS", payload: data?.cart });

          toast.success(`${givenProduct.title} Added to cart`);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleQuantity = async (productId, type) => {
    try {
      const { status, data } = await axios.post(
        `api/user/cart/${productId}`,
        { action: { type } },
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );

      if (status === 200) {
        setAllData({ type: "SET_CART_ITEMS", payload: data?.cart });
        toast.success(`Quantity has been ${type}ed`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const removeFromCart = async (productId, givenProduct) => {
    try {
      const { status, data } = await axios.delete(
        `/api/user/cart/${productId}`,
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );

      if (status === 200) {
        setAllData({ type: "SET_CART_ITEMS", payload: data?.cart });
        toast.success(`${givenProduct.title} has been removed from cart.`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // is in cart?

  const isInCart = (givenProductId) => {
    if (cart.length > 0) {
      const confirmArray = cart.filter(({ _id }) => _id === givenProductId);
      return confirmArray.length > 0 ? true : false;
    }
  };

  // Wishlist handlers here

  const getWishlist = async (encodedToken) => {
    try {
      const response = await axios.get("/api/user/wishlist", {
        headers: {
          authorization: encodedToken,
        },
      });
      if (response.status === 200) {
        return response;
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const setWishlist = async () => {
    try {
      const wishlistResponse = await getWishlist(encodedToken);

      if (wishlistResponse.status === 200) {
        setAllData({
          type: "SET_WISHLIST_ITEMS",
          payload: wishlistResponse?.data?.cart,
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const addToWishlist = async (givenProduct) => {
    try {
      if (isLoggedIn) {
        const { status, data } = await axios.post(
          "/api/user/wishlist",
          {
            product: { ...givenProduct },
          },
          {
            headers: {
              authorization: encodedToken,
            },
          }
        );

        if (status === 201) {
          setAllData({ type: "SET_WISHLIST_ITEMS", payload: data?.wishlist });

          toast.success(`${givenProduct.title} has been added to wishlist`);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const removeFromWishlist = async (productId, givenProduct) => {
    try {
      const { status, data } = await axios.delete(
        `/api/user/wishlist/${productId}`,
        {
          headers: {
            authorization: encodedToken,
          },
        }
      );

      if (status === 200) {
        setAllData({ type: "SET_WISHLIST_ITEMS", payload: data?.wishlist });
        toast.success(`${givenProduct.title} has been removed from wishlist.`);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // is in wishlist?

  const isInWishlist = (givenProductId) => {
    if (wishlist.length > 0) {
      const confirmArray = wishlist.filter(({ _id }) => _id === givenProductId);
      return confirmArray.length > 0 ? true : false;
    }
  };

  //   Apply Filters here

  const sortHighToLowFunction = (list) => {
    if (filterByPriceHighToLow === true) {
      return list.sort((a, b) => b.price - a.price);
    } else {
      return list;
    }
  };

  const sortLowToHighFunction = (list) => {
    if (filterByPriceLowToHigh === true) {
      return list.sort((a, b) => a.price - b.price);
    } else {
      return list;
    }
  };

  const filterPriceRangeFunction = (list) => {
    return list.filter(({ price }) => price <= filterByPriceRange);
  };

  const priceRangeHandler = (e) => {
    const givenPrice = e.target.value;
    setAllData({ type: "PRICE_RANGE", payload: Number(givenPrice) });
  };

  const filterRatingFunction = (list) => {
    return list.filter(({ rating }) => rating >= filterByRating);
  };

  const filterCategoryFunction = (list) => {
    return list.reduce((acc, product) => {
      return filterByCategories.includes(product.categoryName)
        ? [...acc, product]
        : [...acc];
    }, []);
  };

  const searchHandler = (e) => {
    e.preventDefault();
    setAllData({ type: "INPUT_SEARCH", payload: e.target.value });
    navigate("/store");
  };

  const filterSearchFunction = (list) => {
    return list.filter(({ title }) =>
      title.toLowerCase().includes(filterBySearch.toLowerCase())
    );
  };

  // Apply filters here

  const applyFilters = () => {
    const filteredByHighToLowList = sortHighToLowFunction([
      ...productData.productList,
    ]);

    const filteredByLowToHighList = sortLowToHighFunction(
      filteredByHighToLowList
    );

    const filteredByPriceRangeList = filterPriceRangeFunction(
      filteredByLowToHighList
    );

    const filteredByRatingList = filterRatingFunction(filteredByPriceRangeList);

    const filteredByCategoryList =
      filterByCategories.length === 0
        ? filteredByRatingList
        : filterCategoryFunction(filteredByRatingList);

    const filteredBySearchList =
      filterBySearch === ""
        ? filteredByCategoryList
        : filterSearchFunction(filteredByCategoryList);

    setProductData({
      ...productData,
      storeList: [...filteredBySearchList],
    });
  };

  //   useEffects defined below

  useEffect(() => {
    getData();
    if (isLoggedIn) {
      setCart(encodedToken);
      setWishlist(encodedToken);
    }
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allData]);

  return (
    <AppContext.Provider
      value={{
        productData,
        allData,
        setAllData,
        priceRangeHandler,
        categoryData,
        searchHandler,
        addToCart,
        handleQuantity,
        removeFromCart,
        addToWishlist,
        removeFromWishlist,
        isInCart,
        isInWishlist,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
