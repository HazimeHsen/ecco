import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";
import PlaceOrderPage from "@/app/components/PlaceOrderPage/PlaceOrderPage";
import React from "react";

const page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <ClientOnly>
        <PlaceOrderPage currentUser={currentUser} />
      </ClientOnly>
    </>
  );
};

export default page;
