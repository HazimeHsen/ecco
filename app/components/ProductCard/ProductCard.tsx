"use client";
import React from "react";
import "./style.css";
import Button from "../Button";
import { BsCart3 } from "react-icons/bs";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/app/store";
import { RootState } from "@/app/store"; // Assuming RootState type is defined in "store" folder.

interface ProductCardProps {
  id: string;
  offer: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  images: string[];
  rating: number;
  numReviews: number;
  description: string;
  quantity: number;
}

interface Product {
  data: ProductCardProps;
}

const ProductCard: React.FC<Product> = ({ data }) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleAddToCart = (product: ProductCardProps) => {
    dispatch(addToCart(product));
  };

  const starsStyle = {
    "--rating": data.rating,
  } as React.CSSProperties;

  const afterOffer =
    data.offer > 0 ? (data.price - data.price / data.offer).toFixed(2) : "0";

  return (
    <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <Link
        className="relative mx-3 mt-3 flex h-36 overflow-hidden rounded-xl"
        href={`/pages/product/${data.id}?category=${data.category}`}
        passHref>
        <img
          className="object-contain w-full"
          src={data.images[0]}
          alt="product image"
        />
        {data.offer > 0 && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {data.offer}% OFF
          </span>
        )}
      </Link>
      <div className="mt-4 px-5 pb-5">
        <Link href={`/pages/product/${data.id}?category=${data.category}`}>
          <h5 className="text-xl tracking-tight text-slate-900">{data.name}</h5>
        </Link>
        <div className="mt-2 mb-5 flex flex-wrap-reverse items-center justify-between">
          <p>
            <span className="mr-1 text-xl font-bold text-slate-900">
              ${Number(afterOffer) > 0 ? afterOffer : data.price}
            </span>
            {Number(afterOffer) > 0 && (
              <span className="text-xs text-slate-900 line-through">
                ${data.price}
              </span>
            )}
          </p>
          <div
            className="Stars"
            style={starsStyle}
            aria-label={`Rating of this product is ${data.rating} out of 5.`}
          />
        </div>
        {data.countInStock > 0 ? (
          <Button
            label="Add to cart"
            onClick={() => handleAddToCart(data)}
            icon={BsCart3}
          />
        ) : (
          <Button label="Out of stock" outline disabled onClick={() => {}} />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
