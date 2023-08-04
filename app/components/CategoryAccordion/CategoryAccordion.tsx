import { clothesData } from "@/data";
import Link from "next/link";
import React, { useState } from "react";
import { BiCategory } from "react-icons/bi";
interface CategoryAccordionProps {
  onClick: () => void;
}
const CategoryAccordion: React.FC<CategoryAccordionProps> = ({ onClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleAccordion = () => {
    setIsExpanded((prevState) => !prevState);
  };
  let data: string[] = [];
  clothesData.map((item) => {
    if (!data.includes(item.category)) {
      data.push(item.category);
    }
  });
  return (
    <div id="accordionExample">
      <div className="">
        <h2 className="mb-0" id="headingOne">
          <button
            className="flex w-full items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            type="button"
            onClick={toggleAccordion}>
            <div className="mr-2">
              <BiCategory size={20} />
            </div>
            Categories
            <span
              className={`ml-auto h-5 w-5 shrink-0 rotate-${
                isExpanded ? "[-180deg]" : "[180deg]"
              } fill-[#336dec] transition-transform duration-200 ease-in-out group-${
                isExpanded
                  ? "[data-te-collapse-collapsed]"
                  : "[data-te-collapse-expanded]"
              }:rotate-0 group-${
                isExpanded
                  ? "[data-te-collapse-collapsed]"
                  : "[data-te-collapse-expanded]"
              }:fill-[#212529] motion-reduce:transition-none dark:fill-blue-300 dark:group-${
                isExpanded
                  ? "[data-te-collapse-collapsed]"
                  : "[data-te-collapse-expanded]"
              }:fill-white`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div
          id="collapseOne"
          className={` ${
            isExpanded
              ? "visible [data-te-collapse-expanded]"
              : "hidden [data-te-collapse-collapsed]"
          }`}
          data-te-collapse-item
          aria-labelledby="headingOne"
          data-te-parent="#accordionExample">
          <div className="px-5">
            {data &&
              data.map((category) => (
                <Link
                  onClick={onClick}
                  key={category}
                  href={`/pages/category/${category}`}
                  className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group">
                  <div className="flex items-center">
                    <div>{category}</div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryAccordion;
