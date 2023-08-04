import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  images: string[];
}

interface CartState {
  cartItems: Product[];
}

const cartCookie = Cookies.get("cart");
const parsedCartItems = cartCookie ? JSON.parse(cartCookie).cartItems : [];

const initialState: CartState = {
  cartItems: parsedCartItems ?? [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingProductIndex = state.cartItems.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingProductIndex !== -1) {
        state.cartItems[existingProductIndex].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      Cookies.set("cart", JSON.stringify(state));
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (product) => product.id !== action.payload
      );
      Cookies.set("cart", JSON.stringify(state));
    },
    incrementItem(state, action: PayloadAction<string>) {
      const existingProduct = state.cartItems.find(
        (product) => product.id === action.payload
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      }
      Cookies.set("cart", JSON.stringify(state));
    },
    decrementItem(state, action: PayloadAction<string>) {
      const existingProduct = state.cartItems.find(
        (product) => product.id === action.payload
      );
      if (existingProduct && existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      }
      Cookies.set("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, incrementItem, decrementItem } =
  cartSlice.actions;

export const Store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
