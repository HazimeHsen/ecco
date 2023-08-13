import getCurrentUser from "@/app/actions/getCurrentUser";
import Cart from "@/app/components/Cart/Cart";
import ClientOnly from "@/app/components/ClientOnly";
import React from "react";

const page = async () => {
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <Cart currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
