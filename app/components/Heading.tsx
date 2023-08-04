"use client";
import React from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: string;
}

const Heading: React.FC<HeadingProps> = ({ title, subtitle, center }) => {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="md:text-2xl text-lg font-bold">{title}</div>
      <div className="font-light md:text-base text-sm text-neutral-500 mt-2">
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
