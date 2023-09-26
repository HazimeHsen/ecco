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
const AddressInformation = () => {
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
          <Link href="/pages/address">
            <BiEdit size={25} />
          </Link>
        </div>
      </div>
      <div>
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
          <div>No address</div>
        )}
      </div>
    </>
  );
};

export default AddressInformation;
