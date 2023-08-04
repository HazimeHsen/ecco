"use client";

import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import { BiShoppingBag, BiLogOut } from "react-icons/bi";
import { IconType } from "react-icons";
import CategoryDropDown from "./CategoryDropDown";

type Item = {
  name: string;
  path: string;
  icon: IconType;
};

export const Items: Item[] = [
  {
    name: "Products",
    path: "/products",
    icon: BiShoppingBag,
  },
];
const ItemsMenu = () => {
  const router = useRouter();

  return (
    <div>
      <ul className="items-center hidden gap-10 text-md md:flex">
        <li className="cursor-pointer font-semibold hover:text-gray-600 transition">
          <CategoryDropDown />
        </li>
      </ul>
    </div>
  );
};

export default ItemsMenu;
