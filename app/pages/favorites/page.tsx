import ClientOnly from "@/app/components/ClientOnly";
import FavoritesPage from "@/app/components/FavoritesPage/FavoritesPage";
import React from "react";
const Favorites = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  return (
    <ClientOnly>
      <FavoritesPage searchParams={searchParams} />
    </ClientOnly>
  );
};

export default Favorites;
