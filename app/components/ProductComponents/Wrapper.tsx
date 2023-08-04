import React, { ReactNode } from "react";
import { Interface } from "readline";

interface WrapperProps {
  children: ReactNode;
  className?: string;
}
const Wrapper: React.FC<WrapperProps> = ({ children, className }) => {
  return (
    <div
      className={` w-full mx-auto max-w-[1280px] px-5 md:px-10 ${
        className || ""
      }`}>
      {children}
    </div>
  );
};

export default Wrapper;
