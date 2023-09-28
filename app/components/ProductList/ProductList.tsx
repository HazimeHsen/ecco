import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "@prisma/client";

const ProductList = ({
  productData,
  setLoading,
}: {
  productData: Product[];
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return <div></div>;
};

export default ProductList;
