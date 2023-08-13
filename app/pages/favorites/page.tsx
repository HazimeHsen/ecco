import ClientOnly from "@/app/components/ClientOnly";
import FavoritesPage from "@/app/components/FavoritesPage/FavoritesPage";
import React from "react";
const Favorites: React.FC = () => {
  return (
    <ClientOnly>
      <FavoritesPage />
    </ClientOnly>
  );
};

export default Favorites;
