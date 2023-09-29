"use client";
import PaginationControls from "@/app/components/PaginationControls/PaginationControls";
import ProductList from "@/app/components/ProductList/ProductList";
import { clothesData } from "@/data";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Product, Reviews } from "@prisma/client";
import ClientOnly from "@/app/components/ClientOnly";
import Loader from "@/app/components/Loader/Loader";
import ProductCard from "@/app/components/ProductCard/ProductCard";

const page = ({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: {
    [key: string]: string | string | undefined;
  };
}) => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Reviews[]>([]);

  useEffect(() => {
    console.log("hello");
    const getProducts = async () => {
      if (products.length > 0) {
        return;
      }
      try {
        setLoading(true);
        const [reviewsResponse, productsResponse] = await Promise.all([
          axios.get("http://localhost:3000/api/review"),
          axios.get("http://localhost:3000/api/product"),
        ]);

        if (productsResponse.data) {
          setProducts(productsResponse.data);
        }
        if (reviewsResponse.data) {
          setReviews(reviewsResponse.data);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Something went Wrong.");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const { category } = params;
  const data = products.filter((data) => data.category === category);

  const page = searchParams["page"] ?? 1;
  const per_page = searchParams["per_page"] ?? 8;

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = data.slice(start, end);

  return (
    <ClientOnly>
      {loading ? (
        <Loader
          fill="black"
          className="!w-[35px] !h-[35px] text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        />
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <div className="flex justify-center w-full">
              <div className="gap-4 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products &&
                  entries.length > 0 &&
                  entries.map((data) => (
                    <ProductCard
                      reviews={reviews}
                      setLoading={setLoading}
                      key={data.id}
                      data={data}
                    />
                  ))}
              </div>
            </div>
          </div>
          <div>
            <PaginationControls
              dataNb={products.length}
              hasNextPage={end < products.length}
              hasPrevPage={start > 0}
            />
          </div>
        </div>
      )}
    </ClientOnly>
  );
};

export default page;
