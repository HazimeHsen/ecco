import PaginationControls from "@/app/components/PaginationControls/PaginationControls";
import ProductList from "@/app/components/ProductList/ProductList";
import { clothesData } from "@/data";
import React from "react";

const page = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string | undefined;
  };
}) => {
  const page = searchParams["page"] ?? 1;
  const per_page = searchParams["per_page"] ?? 4;

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = clothesData.slice(start, end);
  return (
    <div>
      <ProductList productData={entries} />
      <PaginationControls
        dataNb={clothesData.length}
        hasNextPage={end < clothesData.length}
        hasPrevPage={start > 0}
      />
    </div>
  );
};

export default page;
