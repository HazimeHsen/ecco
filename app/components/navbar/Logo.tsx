"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <div className="flex items-center cursor-pointer">
      <Image
        onClick={() => router.push("/")}
        src="/images/logo.png"
        alt="Logo"
        width={70}
        height={70}
        className="cursor-pointer object-contain transparentBg max-[768px]:w-14 max-[768px]:h-14"
      />
    </div>
  );
};

export default Logo;
