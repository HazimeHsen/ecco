import { createContext } from "react";
import { useState, useContext } from "react";
type CartContextType = {
  cartTotalQty: number;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}

export const CartContextProvider = (props: Props) => {
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const value = {
    cartTotalQty,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null)
    throw new Error("useCart must use within a CartContextProvider");

  return context;
};
