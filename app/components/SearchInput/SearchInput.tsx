"use client";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "../ui/button";
import useSearchInputModal from "@/app/hooks/SearchInput";
import axios from "axios";
import { Product } from "@prisma/client";
import MenuItem from "../navbar/MenuItem";
import Link from "next/link";
import LoadingSvg from "../Loading/Loading";
import Image from "next/image";
import Loader from "../Loader/Loader";

const SearchInput = () => {
  const searchInput = useSearchInputModal();
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const ModalRef = useRef<HTMLDivElement | null>(null);

  const toggle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (searchInput.isOpen) {
      setIsOpen(false);
      searchInput.onClose();
    } else {
      searchInput.onOpen();
    }
  };

  const getProducts = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchInputRef.current &&
        buttonRef.current &&
        ModalRef.current &&
        !searchInputRef.current?.contains(e.target as Node) &&
        !ModalRef.current?.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setProducts([]);
        setQuery("");
        searchInput.onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInput]);
  useEffect(() => {
    if (query.length > 0) {
      setIsOpen(true);
      const getData = async () => {
        try {
          setIsLoading(true);
          const { data } = await axios.get(`/api/product/search/${query}`);
          setIsLoading(false);
          console.log(data);
          console.log(data.products);
          if (data) {
            setProducts(data.products);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };
      getData();
    } else {
      setIsOpen(false);
    }
  }, [query]);
  return (
    <div
      className={`input-wrapper w-full ${
        searchInput.isOpen ? "md:block flex justify-center" : ""
      }`}>
      <form action="">
        <Button type="submit" className="icon" onClick={toggle} ref={buttonRef}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            height="20px"
            width="20px">
            <path
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="1.5"
              stroke="#fff"
              d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
            <path
              stroke-linejoin="round"
              stroke-linecap="round"
              stroke-width="1.5"
              stroke="#fff"
              d="M22 22L20 20"></path>
          </svg>
        </Button>
        <input
          onChange={getProducts}
          placeholder="search..."
          className={` ${searchInput.isOpen ? "input-width" : ""} input`}
          name="text"
          type="text"
          value={query}
          ref={searchInputRef}
        />
      </form>
      {isOpen && (
        <div
          ref={ModalRef}
          className="z-50 absolute rounded shadow-md w-full bg-white  p-3 overflow-hidden left-0 top-14 text-sm">
          <div className="flex flex-col cursor-pointer overflow-hidden relative">
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <Loader
                  fill="black"
                  className="flex justify-center items-center !w-[30px] !h-[30px]"
                />
              </div>
            ) : (
              <>
                {products && products.length > 0 ? (
                  products.map((product) => (
                    <Link
                      href={`/pages/product/${product.id}`}
                      className="px-4 py-3 flex items-center justify-between rounded-md hover:bg-gray-200 duration-200 transition-all">
                      <div className="flex items-center">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={30}
                          height={30}
                          className="border border-black rounded-md mr-2"
                        />
                        <div className="font-semibold">{product.name}</div>
                      </div>
                      <div className="font-bold">${product.price}</div>
                    </Link>
                  ))
                ) : (
                  <div>No products</div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
