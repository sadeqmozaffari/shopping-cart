import { createContext, useContext, useEffect, useReducer } from "react";
import cartItems from "./data";
import reducer from "./reducer";

const cartContext = createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };
  const removeItemCart = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };
  const updateItemQuantity = ( changeObj) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: changeObj });
  };
  useEffect(()=>{
    dispatch({type: "GET_TOTALS"})
  },[state.cart])
  return (
    <cartContext.Provider
      value={{ ...state, clearCart, removeItemCart, updateItemQuantity }}
    >
      {children}
    </cartContext.Provider>
  );
};
const useCartContext = () => {
  return useContext(cartContext);
};
export { useCartContext, CartProvider };
