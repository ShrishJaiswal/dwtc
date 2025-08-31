import React, { createContext, useContext, useState } from "react";
import Constants from "../utility/Constants";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartId, setCartId] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [selectedOption, setSelectedOption] = useState(Constants.TAKEAWAY);
  
  const refreshCart = () => setRefreshFlag((prev) => prev + 1);

  return (
    <CartContext.Provider value={{ cartId, setCartId, refreshFlag, refreshCart, selectedOption, setSelectedOption }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
