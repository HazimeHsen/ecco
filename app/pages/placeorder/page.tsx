import ClientOnly from "@/app/components/ClientOnly";
import PlaceOrderPage from "@/app/components/PlaceOrderPage/PlaceOrderPage";
import React from "react";

const page = () => {
  return (
    <>
      <ClientOnly>
        <PlaceOrderPage />
      </ClientOnly>
    </>
  );
};

export default page;
