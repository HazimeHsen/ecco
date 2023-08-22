import React from "react";
import { Button } from "../ui/button";

const SearchInput = () => {
  return (
    <div className="input-wrapper">
      <Button className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          height="20px"
          width="20px">
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="#fff"
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"></path>
          <path
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="1.5"
            stroke="#fff"
            d="M22 22L20 20"></path>
        </svg>
      </Button>
      <input
        placeholder="search..."
        className="input"
        name="text"
        type="text"
      />
    </div>
  );
};

export default SearchInput;
