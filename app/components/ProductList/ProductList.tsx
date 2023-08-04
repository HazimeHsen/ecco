import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@prisma/client";

const ProductList: React.FC<Product[]> = ({ productData }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="gap-4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productData &&
          productData.length > 0 &&
          productData.map((data) => <ProductCard key={data.id} data={data} />)}
      </div>
    </div>
  );
};

export default ProductList;
