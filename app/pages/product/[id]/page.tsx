import React from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ProductPage from "@/app/components/ProductPage/ProductPage";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface ProductDetailsProps {
  params: Params;
}
const ProductDetails: React.FC<ProductDetailsProps> = async ({ params }) => {
  const { id } = params;
  const currentUser = await getCurrentUser();

  return <ProductPage userId={currentUser?.id} productId={id} />;
};

export default ProductDetails;
