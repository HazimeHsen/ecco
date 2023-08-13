import getCurrentUser from "@/app/actions/getCurrentUser";
import AddressForm from "@/app/components/AddressForm/AddressForm";
import ClientOnly from "@/app/components/ClientOnly";
import React from "react";

const page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <AddressForm currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
