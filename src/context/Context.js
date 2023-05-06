import React, { useContext, useReducer } from "react";
import { createContext } from "react";
import { cartReducer } from "./Reducers";
import { productReducer } from "./Reducers";

const Cart = createContext();

const Context = ({ children }) => {
  const initialValues = {
    products: [],
    cart: [],
    limit: 6,
    categories: [],
  };
  const productInitialValues = {
    searchQuery: "",
  };
  const [state, dispatch] = useReducer(cartReducer, initialValues);
  const [productState, productDispatch] = useReducer(
    productReducer,
    productInitialValues
  );
  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
