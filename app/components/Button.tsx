'use client';

import React, { ReactNode } from "react";
import { IconType } from "react-icons";
import { cn } from "../lib/utils";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
  favorite?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  favorite,
  className,
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        `
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        
        ${
          favorite
            ? "bg-white border-rose-600 text-rose-600"
            : outline
            ? "bg-white border-black text-black"
            : "bg-slate-900 border-slate-900 text-white"
        }
        ${small ? "text-sm" : "text-md"}
        ${small ? "py-1" : "py-3"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
      `,
        className
      )}>
      <div className="flex items-center justify-center">
        {Icon && (
          <Icon
            size={24}
            className={`${favorite ? "fill-rose-600 " : ""} mr-2`}
          />
        )}
        {label}
      </div>
    </button>
  );
};
 
export default Button;