"use client";
import React, { useCallback, useRef, useState } from "react";
import Avatar from "../Avatar";
import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useOutsideClick } from "../useOutsideClick/useOutsideClick";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}
const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const ref = useOutsideClick(closeModal);

  return (
    <div className="relative w-fit">
      <div ref={ref} className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="
          w-10
          h-10
          flex 
          flex-row 
          items-center 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          ">
          <div className="">
            {currentUser && currentUser?.image ? (
              <Avatar image={currentUser?.image} />
            ) : (
              <Avatar />
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="z-50 absolute rounded-xl shadow-md w-[200px] bg-white overflow-hidden right-10 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem label="My Profile" onClick={() => {}} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
