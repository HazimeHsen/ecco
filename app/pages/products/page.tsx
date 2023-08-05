"use client";
import PaginationControls from "@/app/components/PaginationControls/PaginationControls";
import ProductList from "@/app/components/ProductList/ProductList";
import { clothesData } from "@/data";
import React, { useState, useEffect } from "react";
import { Product } from "@prisma/client";
import { toast } from "react-hot-toast";
import axios from "axios";
const page = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string | undefined;
  };
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/api/product");

        if (data) {
          setProducts(data);
        }
      } catch (error) {
        toast.error("Somthing went Wrong.");
      }
    };
    getProducts();
  }, [products]);

  const page = searchParams["page"] ?? 1;
  const per_page = searchParams["per_page"] ?? 4;

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = products.slice(start, end);
  return (
    <div>
      <ProductList productData={entries} />
      <PaginationControls
        dataNb={products.length}
        hasNextPage={end < products.length}
        hasPrevPage={start > 0}
      />
    </div>
  );
};

export default page;
