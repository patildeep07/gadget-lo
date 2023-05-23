import { createContext, useEffect, useReducer, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Loading data
  const [productData, setProductData] = useState({
    productList: [],
    storeList: [],
  });

  const getData = async () => {
    try {
      const products = await fetch("api/products");
      const allProducts = await products.json();
      setProductData({
        ...productData,
        productList: [...allProducts.products],
        storeList: [...allProducts.products],
      });
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
      default:
        return { ...state };
    }
  };

  const [allData, setAllData] = useReducer(reducerFunc, {
    filterByPriceLowToHigh: false,
    filterByPriceHighToLow: false,
    filterByPriceRange: 99999,
    filterByRating: 1,
  });

  //   Apply Filters here

  const {
    filterByPriceHighToLow,
    filterByPriceLowToHigh,
    filterByPriceRange,
    filterByRating,
  } = allData;

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

    setProductData({
      ...productData,
      storeList: [...filteredByRatingList],
    });
  };

  //   useEffects defined below

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allData]);

  return (
    <AppContext.Provider
      value={{ productData, allData, setAllData, priceRangeHandler }}
    >
      {children}
    </AppContext.Provider>
  );
};
