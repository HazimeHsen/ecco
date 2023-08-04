"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "../Button";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  dataNb: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  dataNb,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") ?? 1;
  const per_page = searchParams?.get("per_page") ?? 4;
  console.log(dataNb);
  return (
    <div className="flex g-6 justify-center items-center my-5 w-full">
      <div className="w-20">
        <Button
          disabled={!hasPrevPage}
          label="prev"
          onClick={() => {
            router.push(
              `?page=${Number(page) - 1}&per_page=${Number(per_page)}`
            );
          }}
        />
      </div>

      <div className="fw-semibold text-lg mx-3">
        {page} / {Math.ceil(Number(dataNb) / Number(per_page))}
      </div>
      <div className="w-20">
        <Button
          disabled={!hasNextPage}
          label="next"
          onClick={() => {
            router.push(
              `?page=${Number(page) + 1}&per_page=${Number(per_page)}`
            );
          }}
        />
      </div>
    </div>
  );
};

export default PaginationControls;
