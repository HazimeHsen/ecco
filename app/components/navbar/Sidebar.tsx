"use client";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { BiCategory, BiLogOut, BiShoppingBag } from "react-icons/bi";
import { MdOutlineLogin } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Items } from "./ItemsMenu";
import { SafeUser } from "@/app/types";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import Cart from "../Cart/Cart";
import CategoryAccordion from "../CategoryAccordion/CategoryAccordion";
import Link from "next/link";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const Sidebar: React.FC<UserMenuProps> = ({ currentUser }) => {
  const loginModal = useLoginModal();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleButtonClick = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleClose = () => {
    setTimeout(() => {
      setIsSidebarOpen(false);
    }, 300);
  };

  return (
    <div>
      <div className="text-center">
        <div
          className="cursor-pointer p-2 focus:border rounded-lg"
          onClick={handleButtonClick} // Call the click event handler
        >
          <GiHamburgerMenu size={25} />
        </div>
      </div>
      <div
        onClick={handleButtonClick}
        className={`fixed inset-0 z-30 ${
          isSidebarOpen ? "w-screen" : "w-0"
        } h-screen bg-black/25 `}></div>

      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        } bg-white `}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label">
        <div className="flex z-40 items-center w-full justify-between">
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold text-gray-500 uppercase ">
            Menu
          </h5>
          <div
            className="cursor-pointer text-gray-500"
            onClick={handleButtonClick}
            data-drawer-hide="drawer-navigation"
            aria-controls="drawer-navigation">
            <AiOutlineClose size={20} />
          </div>
        </div>
        <div className="py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li className="flex items-center w-full">
              <div className="flex items-center w-full">
                <div className="w-full">
                  <CategoryAccordion onClick={handleButtonClick} />
                </div>
              </div>
            </li>
            <li className="cursor-pointer">
              <a
                href="/pages/profile"
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                <div className="flex items-center">
                  <div className="mr-2">
                    <BiShoppingBag size={20} />
                  </div>
                  <div>Profile</div>
                </div>
              </a>
            </li>
            {currentUser ? (
              <>
                <li className="cursor-pointer">
                  <Link
                    href="/profile"
                    className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <CgProfile size={20} />
                      </div>
                      <div>Profile</div>
                    </div>
                  </Link>
                </li>
                <hr />
                <li className="cursor-pointer" onClick={() => signOut()}>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <BiLogOut size={20} />
                      </div>
                      <div>Logout</div>
                    </div>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="cursor-pointer" onClick={loginModal.onOpen}>
                  <div className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                    <div className="flex items-center">
                      <div className="mr-2">
                        <MdOutlineLogin size={20} />
                      </div>
                      <div>Login</div>
                    </div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
