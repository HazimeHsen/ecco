"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Product, Reviews } from "@prisma/client";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import PaginationControls from "../PaginationControls/PaginationControls";

const FavoritesPage = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);
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
  useEffect(() => {
    const favoritesCookieValue = Cookies.get("favorites");
    const parsedFavoriteItems: Product[] = favoritesCookieValue
      ? JSON.parse(favoritesCookieValue).favoriteItems
      : [];

    // Filter favorite items that have a matching product id
    const validFavoriteItems = parsedFavoriteItems.filter((favoriteItem) =>
      products.some((product) => product.id === favoriteItem.id)
    );

    setFavoriteItems(validFavoriteItems);
  }, [products]);
  const page = searchParams["page"] ?? 1;
  const per_page = searchParams["per_page"] ?? 8;

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = favoriteItems.slice(start, end);

  return (
    <div>
      <h1 className="text-2xl font-bold underline my-5">Favorite Products: </h1>
      {loading ? (
        <Loader
          fill="black"
          className="!w-[35px] !h-[35px] text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        />
      ) : (
        <>
          <div className="flex flex-col items-center justify-center w-full">
            {favoriteItems.length > 0 ? (
              <>
                <div className="gap-4 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {favoriteItems.map((item) => (
                    <ProductCard reviews={reviews} key={item.id} data={item} />
                  ))}
                </div>
                <div>
                  <PaginationControls
                    dataNb={entries.length}
                    hasNextPage={end < entries.length}
                    hasPrevPage={start > 0}
                  />
                </div>
              </>
            ) : (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl w-full">
                <h2>No favorite products yet.</h2>
                <Link
                  className="flex justify-center items-center font-semibold text-indigo-600 w-full"
                  href="/">
                  <svg
                    className="fill-current mr-2 text-indigo-600 w-4"
                    viewBox="0 0 448 512">
                    <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                  </svg>
                  <div className="text-center">Continue Shopping</div>
                </Link>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
