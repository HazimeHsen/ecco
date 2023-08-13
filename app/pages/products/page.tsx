"use client";
import PaginationControls from "@/app/components/PaginationControls/PaginationControls";
import ProductList from "@/app/components/ProductList/ProductList";
import { clothesData } from "@/data";
import React, { useState, useEffect } from "react";
import { Product } from "@prisma/client";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loader from "@/app/components/Loader/Loader";
import ClientOnly from "@/app/components/ClientOnly";
const page = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string | undefined;
  };
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/product");

        if (data) {
          setProducts(data);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Somthing went Wrong.");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const page = searchParams["page"] ?? 1;
  const per_page = searchParams["per_page"] ?? 4;

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = products.slice(start, end);
  return (
    <ClientOnly>
      <>
        {loading ? (
          <Loader
            fill="black"
            className="!w-[35px] !h-[35px] text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
          />
        ) : (
          <div>
            <ProductList productData={entries} />
            <PaginationControls
              dataNb={products.length}
              hasNextPage={end < products.length}
              hasPrevPage={start > 0}
            />
          </div>
        )}
      </>
    </ClientOnly>
  );
};

export default page;
