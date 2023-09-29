"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import Cookies from "js-cookie";
import { Country } from "@/app/components/AddressForm/AutocompleteInput";

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: Country | null;
}
const AddressInformation = ({ id }: { id: string }) => {
  const [Address, setAddress] = useState<Address>();

  useEffect(() => {
    const addressCookieValue = Cookies.get("address");
    console.log(addressCookieValue);
    const parsedFavoriteItems = addressCookieValue
      ? JSON.parse(addressCookieValue)
      : null;
    setAddress(parsedFavoriteItems);
  }, []);

  return (
    <>
      <div className="flex items-center justify-between  mb-5 px-4">
        <h1 className="text-xl md:text-3xl font-bold">Address</h1>
        <div>
          <Link href={`/pages/address?redirect=profile/${id}`}>
            <BiEdit size={25} />
          </Link>
        </div>
      </div>
      <div className="h-full">
        {Address ? (
          <div>
            <>
              <div className="text-gray-600 py-2 px-2">
                <span className="text-lg font-semibold mr-1 text-black">
                  Street:{" "}
                </span>
                {Address?.street}
              </div>
              <div className="text-gray-600 py-3 px-2">
                <span className="text-lg font-semibold mr-1 text-black">
                  State:{" "}
                </span>
                {Address?.state}
              </div>
              <div className="text-gray-600 py-3 px-2">
                <span className="text-lg font-semibold mr-1 text-black">
                  Postal Code:{" "}
                </span>
                {Address?.postalCode}
              </div>
              <div className="text-gray-600 py-3 px-2">
                <span className="text-lg font-semibold mr-1 text-black">
                  City:{" "}
                </span>
                {Address?.city}
              </div>
              <div className="text-gray-600 py-3 px-2">
                <span className="text-lg font-semibold mr-1 text-black">
                  Country:{" "}
                </span>
                {Address?.country?.name}
              </div>
            </>
          </div>
        ) : (
          <div className="flex h-full justify-center items-center flex-col">
            <h2>No Address</h2>
            <Link
              className="flex justify-center font-semibold text-indigo-600"
              href={`/pages/address?redirect=profile/${id}`}>
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512">
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              <div className="text-nowrap w-fit">Add New Address</div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default AddressInformation;
