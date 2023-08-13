import AddressForm from "@/app/components/AddressForm/AddressForm";
import ClientOnly from "@/app/components/ClientOnly";
import React from "react";

const page = () => {
  return (
    <ClientOnly>
      <AddressForm />
    </ClientOnly>
  );
};

export default page;
