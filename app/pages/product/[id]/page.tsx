"use client";
import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsCart, BsCart3 } from "react-icons/bs";
import Wrapper from "@/app/components/ProductComponents/Wrapper";
import ProductDetailsCarousel from "@/app/components/ProductComponents/ProductDetailsCarousel";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { clothesData } from "@/data";
import Button from "@/app/components/Button";
interface ProductDetailsProps {
  params: Params;
}
const ProductDetails: React.FC<ProductDetailsProps> = ({ params }) => {
  const { id } = params;
  const data = clothesData.filter((pro) => pro.id === id);
  const starsStyle = {
    "--rating": data[0]?.rating,
  } as React.CSSProperties;
  const afterOffer = (data[0].price - data[0].price / data[0].offer).toFixed(2);
  return (
    <div className=" w-full pt-3">
      <Wrapper>
        <div className=" flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
          <div className=" w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
            <ProductDetailsCarousel images={data[0].images} />
          </div>

          <div className=" flex-1 py-3">
            <div className="flex items-center text-[34px] leading-none font-semibold mb-3">
              <div>{data && data[0]?.name}</div>
              <div className="text-3xl ml-4 text-red-600">
                {data && data[0]?.offer}%
              </div>
            </div>
            <div className="font-semibold mb-5">
              {data && data[0]?.subtitle}
            </div>
            <div className="mt-2 mb-5 flex flex-wrap-reverse items-center justify-between">
              <p>
                <span className="mr-1 text-xl font-bold text-slate-900">
                  ${Number(afterOffer) > 0 ? afterOffer : data[0].price}
                </span>
                {Number(afterOffer) > 0 ? (
                  <span className="text-xs text-slate-900 line-through">
                    ${data[0].price}
                  </span>
                ) : (
                  ""
                )}
              </p>
              <div
                className="Stars"
                style={starsStyle}
                aria-label={`Rating of this product is ${data[0].rating} out of 5.`}
              />
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
                <Button label="Add to cart" onClick={() => {}} icon={BsCart3} />
              ) : (
                <Button
                  label="Out of stock"
                  outline
                  disabled
                  onClick={() => {}}
                />
              )}{" "}
            </div>
            <div className="mb-3">
              <Button
                label="Whishlist"
                onClick={() => {}}
                icon={IoMdHeartEmpty}
                outline
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProductDetails;
