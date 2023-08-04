"use client";
import Button from "@/app/components/Button";
import { decrementItem, incrementItem, removeFromCart } from "@/app/store";
import Link from "next/link";
import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store"; // Assuming RootState type is defined in "store" folder.

const Cart: React.FC = () => {
  // Retrieve cartItems from the Redux store
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleIncrement = (id: string) => {
    dispatch(incrementItem(id));
  };

  const handleDecrement = (id: string) => {
    dispatch(decrementItem(id));
  };

  const handleRemoveFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = Number(
    cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );

  return (
    <div className="w-full h-full">
      {totalQuantity === 0 ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl w-full">
          <h2>Cart is empty</h2>
          <Link
            className="flex justify-center font-semibold text-indigo-600"
            href="/">
            <svg
              className="fill-current mr-2 text-indigo-600 w-4"
              viewBox="0 0 448 512">
              {/* Continue Shopping Icon */}
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            <div className="text-nowrap w-fit">Continue Shopping</div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap-reverse">
          <div className="md:w-3/4 w-full bg-white pb-10 pt-5 md:p-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl">Shopping Cart</h1>
              <h2 className="font-semibold text-2xl">
                {totalQuantity > 0 ? totalQuantity : 0} Items
              </h2>
            </div>
            <div className="flex mt-10 mb-5 w-full flex-1 flex-grow-1">
              <h3 className="font-semibold flex-1 text-gray-600 text-xs uppercase w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold flex-1 text-center text-gray-600 text-xs uppercase w-1/5">
                Quantity
              </h3>
              <h3 className="font-semibold flex-1 text-center text-gray-600 text-xs uppercase w-1/5">
                Price
              </h3>
            </div>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center hover:bg-gray-100 py-5 w-full flex-1 flex-grow-1 border-b">
                  <div className="flex w-2/5 flex-1">
                    <div className="h-fit w-20">
                      <img
                        className="object-contain"
                        src={item.images[0]}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{item.name}</span>
                      <span className="text-red-500 text-xs">
                        {item.category}
                      </span>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="font-semibold text-start w-fit hover:text-red-500 text-gray-500 text-xs">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-center items-center w-1/5 flex-1">
                    <span
                      onClick={() => handleDecrement(item.id)}
                      className="font-bold text-lg cursor-pointer">
                      <AiOutlineMinus />
                    </span>
                    <span className="font-bold text-lg mx-2">
                      {item.quantity}
                    </span>
                    <span
                      onClick={() => handleIncrement(item.id)}
                      className="font-bold text-lg cursor-pointer">
                      <AiOutlinePlus />
                    </span>
                  </div>
                  <span className="text-center w-1/5 font-semibold text-sm flex-1">
                    ${item.price}
                  </span>
                </div>
              ))
            ) : (
              <p>No items in the cart.</p>
            )}
            <Link
              className="flex font-semibold text-indigo-600 text-sm mt-10"
              href="/">
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512">
                {/* Continue Shopping Icon */}
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>
          <div id="summary" className="md:w-1/4 w-full md:px-8 pb-10 md:py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                {" "}
                Items ({totalQuantity > 0 ? totalQuantity : 0})
              </span>
              <span className="font-semibold text-sm">
                ${totalPrice > 0 ? totalPrice : 0}
              </span>
            </div>
            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>${totalPrice > 0 ? totalPrice : 0}</span>
              </div>
              <Button label="Checkout" onClick={() => {}} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
