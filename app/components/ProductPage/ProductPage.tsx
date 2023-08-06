"use client";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { BsCart3, BsTrash } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Product } from "@prisma/client";
import Wrapper from "../ProductComponents/Wrapper";
import ProductDetailsCarousel from "../ProductComponents/ProductDetailsCarousel";
import Rating from "../Rating/Rating";
import Loader from "../Loader/Loader";
import { useDispatch } from "react-redux";
import {
  RootState,
  addToCart,
  addToFavorites,
  isProductInFavorites,
  removeFromFavorites,
} from "@/app/store";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

interface ProductPageProps {
  userId?: string | undefined;
  productId: string;
}

const ProductPage: React.FC<ProductPageProps> = ({ userId, productId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  const isFavorite = useSelector((state: RootState) =>
    state.favorites.favoriteItems.some((item) => item.id === productId)
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
        setLoading(false);
        toast.error("Somthing went Wrong.");
      }
    };
    getProducts();
  }, []);

  const data = products.filter((pro) => pro.id === productId);
  const afterdiscount = (
    (data[0]?.price ? data[0].price : 0) -
    (data[0] ? data[0]?.price / data[0]?.discount : 0)
  ).toFixed(2);

  const price = data[0] ? data[0].price : 0;
  return (
    <>
      {loading ? (
        <Loader
          fill="black"
          className="!w-[35px] !h-[35px] text-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        />
      ) : (
        <div className=" w-full pt-3">
          <Wrapper>
            <div className=" flex flex-col lg:flex-row md:px-10 md:gap-[50px] lg:gap-[100px]">
              <div className=" w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                <ProductDetailsCarousel
                  images={data[0] ? data[0].images : []}
                />
              </div>

              <div className=" flex-1 py-3">
                <div className="flex items-center text-[34px] leading-none font-semibold mb-3">
                  <div>{data && data[0]?.name}</div>
                  <div className="text-3xl ml-4 text-red-600">
                    {data && data[0]?.discount}%
                  </div>
                </div>
                <div className="font-semibold mb-5">
                  {data && data[0]?.description}
                </div>
                <div className="mt-2 mb-5 flex flex-wrap-reverse items-center justify-between">
                  <p>
                    <span className="mr-1 text-xl font-bold text-slate-900">
                      ${Number(afterdiscount) > 0 ? afterdiscount : price}
                    </span>
                    {Number(afterdiscount) > 0 ? (
                      <span className="text-xs text-slate-900 line-through">
                        ${price}
                      </span>
                    ) : (
                      ""
                    )}
                  </p>
                  <div>
                    <Rating touchable userId={userId} productId={productId} />
                  </div>
                </div>

                <div className=" my-7">
                  <div className=" flex justify-between mb-2">
                    <div className=" text-base font-semibold">Size Select</div>
                    <div className=" text-base font-semibold">Select Guide</div>
                  </div>

                  <div className=" grid grid-cols-3 gap-2">
                    <div className=" border rounded-full text-center py-3 font-medium hover:border-black cursor-pointer">
                      UK 5
                    </div>
                    <div className=" border rounded-full text-center py-3 font-medium cursor-not-allowed bg-black/[.1] opacity-50">
                      UK 6
                    </div>
                    <div className=" border rounded-full text-center py-3 font-medium hover:border-black cursor-pointer">
                      UK 7
                    </div>
                    <div className=" border rounded-full text-center py-3 font-medium hover:border-black cursor-pointer">
                      UK 8
                    </div>
                    <div className=" border rounded-full text-center py-3 font-medium hover:border-black cursor-pointer">
                      UK 9
                    </div>
                    <div className=" border rounded-full text-center py-3 font-medium cursor-not-allowed bg-black/[.1] opacity-50">
                      UK 10
                    </div>
                  </div>
                  <div className=" text-red-600 mt-1">
                    {" "}
                    Size selection is required
                  </div>
                </div>
                <div className="mb-3">
                  {data && data[0]?.countInStock > 0 ? (
                    <Button
                      label="Add to cart"
                      onClick={() => handleAddToCart(data[0])}
                      icon={BsCart3}
                    />
                  ) : (
                    <Button
                      label="Out of stock"
                      outline
                      disabled
                      onClick={() => {}}
                    />
                  )}{" "}
                </div>
                <div className="mb-3 flex gap-2 ">
                  <Button
                    favorite={favorite === true ? true : false}
                    label="Whishlist"
                    onClick={() => handleAddToFavorites(data[0])}
                    icon={IoMdHeartEmpty}
                    outline
                  />
                  {favorite && (
                    <Button
                      outline
                      label="Remove"
                      onClick={() => handleRemoveFromFavorites(data[0])}
                      icon={BsTrash}
                    />
                  )}
                </div>
              </div>
            </div>
          </Wrapper>
        </div>
      )}
    </>
  );
};

export default ProductPage;
