import React from "react";
import ClientOnly from "@/app/components/ClientOnly";
import ProductsPage from "@/app/components/ProductsPage/ProductsPage";

const page = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  return (
    <ClientOnly>
      <ProductsPage searchParams={searchParams} />
    </ClientOnly>
  );
};

export default page;
