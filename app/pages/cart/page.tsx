import Cart from "@/app/components/Cart/Cart";
import ClientOnly from "@/app/components/ClientOnly";
import React from "react";

const page = () => {
  return (
    <ClientOnly>
      <Cart />
    </ClientOnly>
  );
};

export default page;
