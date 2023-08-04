import React from "react";
import ProductCard from "../ProductCard/ProductCard";

interface ProductProps {
  id: string;
  offer: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  images: string[];
  rating: number;
  numReviews: number;
  description: string;
  quantity: number;
}
interface ProductDataProps {
  productData: ProductProps[];
}
const ProductList: React.FC<ProductDataProps> = ({ productData }) => {
  return (
    <div className="flex justify-center w-full">
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {productData &&
          productData.length > 0 &&
          productData.map((data) => <ProductCard key={data.id} data={data} />)}
      </div>
    </div>
  );
};

export default ProductList;
