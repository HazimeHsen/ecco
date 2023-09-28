"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  addToFavorites,
  removeFromFavorites,
} from "@/app/Redux/store";
import { RootState } from "@/app/Redux/store";
import { Product, Reviews } from "@prisma/client";
import Rating from "../Rating/Rating";
import HeartIcon from "../HeartLike/HeartLike";

const ProductCard = ({
  data,
  reviews,
  setLoading,
}: {
  data: Product;
  reviews:Reviews[]
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [favorite, setFavorite] = useState(false);

  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favoriteItems.some((item) => item.id === data.id)
  );

  useEffect(() => {
    setFavorite(isFavorite);
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

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const afterdiscount =
    data.discount > 0
      ? (data.price - data.price / data.discount).toFixed(2)
      : "0";

  return (
    <>
      <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
        <Link
          className="relative mx-3 mt-3 flex overflow-hidden "
          href={`/pages/product/${data.id}?category=${data.category}`}
          passHref>
          <img
            className="object-contain w-full rounded-xl max-h-[120px] md:max-h-[150px] !md:h-[140px] !h-[120px]"
            src={data.images[0]}
            alt="product image"
          />
          {data.discount > 0 && (
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              {data.discount}% OFF
            </span>
          )}
        </Link>
        <div className="absolute top-5 right-5 ">
          <HeartIcon data={data} />
        </div>
        <div className="mt-1 md:mt-4 px-5 pb-5">
          <Link href={`/pages/product/${data.id}?category=${data.category}`}>
            <h5 className="text-xl tracking-tight text-slate-900">
              {data.name}
            </h5>
          </Link>
          <div className="mt-2 mb-5 block sm:flex md:block lg:flex flex-row-reverse  items-center justify-between">
            <Rating
            reviews={reviews}
              productId={data.id}
              touchable={false}
            />
            <p>
              <span className="mr-1 text-xl font-bold text-slate-900">
                ${Number(afterdiscount) > 0 ? afterdiscount : data.price}
              </span>
              {Number(afterdiscount) > 0 && (
                <span className="text-xs text-slate-900 line-through">
                  ${data.price}
                </span>
              )}
            </p>
          </div>
          {data.countInStock > 0 ? (
            <Button
              className=" text-sm md:text-lg "
              label="Add to cart"
              onClick={() => handleAddToCart(data)}
              icon={BsCart3}
            />
          ) : (
            <Button
              className=" text-sm md:text-lg "
              label="Out of stock"
              outline
              disabled
              onClick={() => {}}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
