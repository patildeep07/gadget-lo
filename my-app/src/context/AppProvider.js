import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Loading data
  const [productData, setProductData] = useState({
    productList: [],
    storeList: [],
  });

  const [categoryData, setCategoryData] = useState([]);

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
  });

  //   Apply Filters here

  const {
    filterByPriceHighToLow,
    filterByPriceLowToHigh,
    filterByPriceRange,
    filterByRating,
    filterByCategories,
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

  const filterCategoryFunction = (list) => {
    return list.reduce((acc, product) => {
      return filterByCategories.includes(product.categoryName)
        ? [...acc, product]
        : [...acc];
    }, []);
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

    // const filteredByCategoryList = filterCategoryFunction(filteredByRatingList);

    setProductData({
      ...productData,
      storeList: [...filteredByCategoryList],
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
      value={{
        productData,
        allData,
        setAllData,
        priceRangeHandler,
        categoryData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
