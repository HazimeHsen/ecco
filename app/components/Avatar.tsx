"use client";
import React from "react";
import Image from "next/image";
interface AvatarProps {
  image?: string | null;
}
const Avatar: React.FC<AvatarProps> = ({ image }) => {
  return (
    <Image
      className="rounded-full"
      fill
      alt="avatar"
      src={image ? image : "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
