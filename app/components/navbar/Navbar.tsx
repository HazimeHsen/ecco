"use client";
import React from "react";
import UserMenu from "./UserMenu";
import { SafeUser } from "@/app/types";
import Logo from "./Logo";
import ItemsMenu from "./ItemsMenu";
import Sidebar from "./Sidebar";
import Link from "next/link";
import { BsCart3 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/Redux/store";
import Container from "../Container";
import SearchInput from "../SearchInput/SearchInput";
import useSearchInputModal from "@/app/hooks/SearchInput";
interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const searchInput = useSearchInputModal();
  return (
    <div className="p-2 z-40 py-4 w-full">
      <Container>
        <div
          className={`flex items-center w-full ${
            searchInput.isOpen
              ? " md:justify-between justify-center"
              : " justify-between"
          } bg-transparent`}>
          <div className={` ${searchInput.isOpen ? "md:block hidden" : ""} `}>
            <Logo />{" "}
          </div>

          <div className="hidden lg:flex items-center gap-6">
            <ItemsMenu />
          </div>

          <div className="flex items-center justify-center gap-6">
            <SearchInput />
            <div
              className={`flex items-center font-semibold relative ${
                searchInput.isOpen ? "md:block hidden" : ""
              }`}>
              <Link href="/pages/cart">
                <div className="bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full absolute -top-3 -right-2">
                  <span className="text-xs">
                    {totalQuantity > 0 ? totalQuantity : 0}
                  </span>
                </div>{" "}
                <BsCart3 size={25} />
              </Link>
            </div>

            <div
              className={` ${
                searchInput.isOpen
                  ? "lg:hidden md:block hidden "
                  : "block lg:hidden"
              } `}>
              <Sidebar currentUser={currentUser} />
            </div>

            <div className="hidden lg:flex items-center">
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
