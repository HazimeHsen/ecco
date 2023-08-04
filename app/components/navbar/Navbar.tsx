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
import { RootState } from "@/app/store";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  // Calculate totalQuantity using Redux state
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="p-2 py-4">
      <div className="flex items-center justify-between bg-transparent">
        <Logo />
        <div className="hidden md:flex items-center gap-6">
          <ItemsMenu />
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center font-semibold relative">
            <Link href="/pages/cart">
              <div className="bg-red-600 text-white w-4 h-4 flex items-center justify-center rounded-full absolute -top-3 -right-2">
                {/* Display the total quantity */}
                <span className="text-xs">
                  {totalQuantity > 0 ? totalQuantity : 0}
                </span>
              </div>{" "}
              <BsCart3 size={25} />
            </Link>
          </div>

          <div className="block md:hidden">
            <Sidebar currentUser={currentUser} />
          </div>

          <div className="hidden md:flex items-center">
            <UserMenu currentUser={currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
