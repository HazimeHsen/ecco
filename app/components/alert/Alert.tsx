"use client";
import { Alert, AlertDescription, AlertTitle } from "@/app/components/ui/alert";
import { BiEdit } from "react-icons/bi";
import React, { ReactNode } from "react";

interface BoxInfoProps {
  title: string;
  onClick: () => void;
  isText?: boolean;
  description: ReactNode;
}

export function BoxInfo({
  title,
  onClick,
  isText = false,
  description,
}: BoxInfoProps) {
  return (
    <Alert>
      <AlertTitle className="w-full flex justify-between items-center">
        <div>{title}</div>
        {isText ? null : (
          <div
            className="cursor-pointer p-1 transition-all duration-300 hover:bg-gray-300 rounded"
            onClick={onClick}>
            <BiEdit size={20} />
          </div>
        )}
      </AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
