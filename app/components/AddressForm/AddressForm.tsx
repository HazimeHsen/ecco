"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AutocompleteInput, { Country } from "./AutocompleteInput";
import { Button } from "../ui/button";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { SafeUser } from "@/app/types";

interface FormData {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: Country | null;
}

function AddressForm({ currentUser }: { currentUser?: SafeUser | null }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Country | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);
  const paymentMethodFromCookies = Cookies.get("PaymentMethod");
  const defaultPaymentMethod = paymentMethodFromCookies
    ? JSON.parse(paymentMethodFromCookies)
    : null;
  useEffect(() => {
    if (!currentUser || !defaultPaymentMethod) {
      router.push("/");
    }
  }, [currentUser]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  useEffect(() => {
    const storedData = Cookies.get("address");
    if (storedData) {
      const { street, country, city, state, postalCode } =
        JSON.parse(storedData);
      setSelected(country);
      setValue("street", street);
      setValue("city", city);
      setValue("state", state);
      setValue("postalCode", postalCode);
    }
  }, []);
  const onSubmit: SubmitHandler<FormData> = (data) => {
    if (!selected) {
      setCountryError("Please select a country");
      return;
    }

    if (countryError) {
      setCountryError(null);
    }
    console.log(data);

    const addressWithCountry = {
      ...data,
      country: selected,
    };

    Cookies.set("address", JSON.stringify(addressWithCountry), {
      expires: 30,
    });
    router.push("/pages/placeorder");
  };
  return (
    <div className="w-full px-4 flex justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 md:max-w-[50%] w-full">
        <h1 className="md:text-3xl text-xl font-bold underline mb-5">
          Address:
        </h1>
        <div className="flex flex-col">
          <label className="mb-2">Street Address:</label>
          <input
            className="w-full rounded-lg border-gray-500 border focus:border-black transition-all duration-300 outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
            type="text"
            {...register("street", { required: "Street address is required" })}
          />
          {errors.street && (
            <p className="text-red-500">{errors.street.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-2">City:</label>
          <input
            className="w-full rounded-lg border-gray-500 border focus:border-black transition-all duration-300 outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
            type="text"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="mb-2">State:</label>
          <input
            className="w-full rounded-lg border-gray-500 border focus:border-black transition-all duration-300 outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
            type="text"
            {...register("state", { required: "State is required" })}
          />
          {errors.state && (
            <p className="text-red-500">{errors.state.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Postal Code:</label>
          <input
            className="w-full rounded-lg border-gray-500 border focus:border-black transition-all duration-300 outline-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
            type="text"
            {...register("postalCode", {
              required: "Postal code is required",
            })}
          />
          {errors.postalCode && (
            <p className="text-red-500">{errors.postalCode.message}</p>
          )}
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Country:</label>
          <AutocompleteInput selected={selected} setSelected={setSelected} />
          {countryError && <p className="text-red-500">{countryError}</p>}{" "}
        </div>
        <Button type="submit" className="mt-4 w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddressForm;
