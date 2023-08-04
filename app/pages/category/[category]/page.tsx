import PaginationControls from "@/app/components/PaginationControls/PaginationControls";
import ProductList from "@/app/components/ProductList/ProductList";
import { clothesData } from "@/data";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React from "react";

const page = ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: {
    [key: string]: string | string | undefined;
  };
}) => {
  const { category } = params;
  const data = clothesData.filter((data) => data.category === category);

  const page = searchParams["page"] ?? 1;
  const per_page = searchParams["per_page"] ?? 4;

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = data.slice(start, end);

  return (
    <div>
      <ProductList productData={entries} />
      <PaginationControls
        dataNb={entries.length}
        hasNextPage={end < data.length}
        hasPrevPage={start > 0}
      />
    </div>
  );
};

export default page;
