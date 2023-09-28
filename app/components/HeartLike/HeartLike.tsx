import {
  RootState,
  addToCart,
  addToFavorites,
  removeFromFavorites,
} from "@/app/Redux/store";
import { Product } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./style.css";

const HeartIcon = ({ data }: { data: Product }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favoriteItems.some((item) => item.id === data.id)
  );
  const [isActive, setIsActive] = useState(isFavorite);

  useEffect(() => {
    setFavorite(isFavorite);
    setIsActive(isFavorite);
  }, [isFavorite]);

  const handleAddToFavorites = (product: Product) => {
    if (!isFavorite) {
      dispatch(addToFavorites(product));
    } else {
      setFavorite(true);
    }
  };

  const handleRemoveFromFavorites = (product: Product) => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    }
  };

  const handleIconClick = () => {
    setIsActive((prevIsActive) => !prevIsActive);
    if (favorite) {
      handleRemoveFromFavorites(data);
      setFavorite(false);
    } else {
      handleAddToFavorites(data);
      setFavorite(true);
    }
  };

  return (
    <div className="large-font text-center top-20">
      <IoIosHeart
        size={25}
        className={`${isActive ? "active" : ""} ion-icon cursor-pointer`}
        onClick={handleIconClick}
        color={isActive ? "red" : ""}
      />
    </div>
  );
};

export default HeartIcon;
