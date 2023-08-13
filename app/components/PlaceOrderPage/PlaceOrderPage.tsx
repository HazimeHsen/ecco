"use client";
import { BoxInfo } from "@/app/components/alert/Alert";
import { RootState } from "@/app/store";
import React from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import usePaymentMethodModal from "@/app/hooks/PaymentMethodModal";

interface AddressData {
  country: { name: string };
  city: string;
  street: string;
  state: string;
  postalCode: string;
}

const PlaceOrderPage: React.FC = () => {
  const PaymentMethodModal = usePaymentMethodModal();
  const router = useRouter();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = Number(
    cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );

  const storedData = Cookies.get("address");
  const addressData: AddressData = storedData ? JSON.parse(storedData) : {};
  const addressInfo = [
    {
      title: "Country",
      value: addressData.country ? addressData.country.name : "",
    },
    { title: "City", value: addressData.city },
    { title: "Street Address", value: addressData.street },
    { title: "State", value: addressData.state },
    { title: "Postal Code", value: addressData.postalCode },
  ];

  const address = (
    <div className="mt-4 ml-2">
      <ul className="space-y-2">
        {addressInfo.map((item, index) => (
          <li className="flex" key={index}>
            <h3 className="font-bold mr-2">{item.title}:</h3>
            <p className="text-gray-600 font-semibold">{item.value}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  const paymentMethodCookie = Cookies.get("PaymentMethod");
  const paymentMethod = paymentMethodCookie
    ? JSON.parse(paymentMethodCookie)
    : "";

  // ... (rest of the code)

  const product = (
    <>
      <div className="flex mt-5 mb-5 w-full flex-1 flex-grow-1">
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
            className="flex justify-between items-center py-5 w-full flex-1 flex-grow-1">
            <div className="flex items-center w-2/5 flex-1">
              <div className="">
                <Image
                  className="object-contain"
                  width={50}
                  height={50}
                  src={item.images[0]}
                  alt=""
                />
              </div>
              <div className="flex flex-col ml-4 flex-grow">
                <span className="font-bold text-sm">{item.name}</span>
                <span className="text-red-500 text-xs">{item.category}</span>
              </div>
            </div>
            <div className="flex justify-center items-center w-1/5 flex-1">
              <span className="font-bold text-lg mx-2">{item.quantity}</span>
            </div>
            <span className="text-center w-1/5 font-semibold text-sm flex-1">
              ${item.price}
            </span>
          </div>
        ))
      ) : (
        <p>No items</p>
      )}
    </>
  );

  const placeOrder = (
    <div>
      <div className="flex font-semibold justify-between py-6 text-sm uppercase">
        <span>Total cost</span>
        <span>${totalPrice > 0 ? totalPrice : 0}</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Please review the products, payment method, and address information
        before proceeding to checkout.
      </p>
      <Button className="w-full" onClick={() => {}}>
        Proceed to Checkout
      </Button>
    </div>
  );

  return (
    <div className="flex flex-wrap md:flex-nowrap w-full gap-4">
      <div className="w-full md:w-3/4 flex flex-col gap-4">
        <div>
          <BoxInfo
            onClick={PaymentMethodModal.onOpen}
            title="Payment Method"
            description={
              <div className="ml-3 font-semibold">{paymentMethod}</div>
            }
          />
        </div>
        <div>
          <BoxInfo
            title="Products"
            onClick={() => router.push("/pages/cart")}
            description={product}
          />
        </div>
        <div>
          <BoxInfo
            title="Address Information"
            onClick={() => router.push("/pages/address")}
            description={address}
          />
        </div>
      </div>
      <div className="w-full md:w-1/4">
        <BoxInfo
          title="Place Order"
          onClick={() => {}}
          isText
          description={placeOrder}
        />
      </div>
    </div>
  );
};

export default PlaceOrderPage;