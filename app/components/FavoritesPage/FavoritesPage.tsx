"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Product } from "@prisma/client";
import ProductCard from "../ProductCard/ProductCard";
import Link from "next/link";

const FavoritesPage = () => {
  // Define state to hold favorite items
  const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);

  useEffect(() => {
    // Retrieve favorite items from cookies
    const favoritesCookieValue = Cookies.get("favorites");
    const parsedFavoriteItems: Product[] = favoritesCookieValue
      ? JSON.parse(favoritesCookieValue).favoriteItems
      : [];
    setFavoriteItems(parsedFavoriteItems);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold underline">Favorite Products: </h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {favoriteItems.length > 0 ? (
          favoriteItems.map((item) => <ProductCard key={item.id} data={item} />)
        ) : (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-xl w-full">
            <h2>No favorite products yet.</h2>
            <Link
              className="flex justify-center items-center font-semibold text-indigo-600 w-full"
              href="/">
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512">
                {/* Continue Shopping Icon */}
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              <div className="text-center">Continue Shopping</div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
