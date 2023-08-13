import React from "react";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import ProductPage from "@/app/components/ProductPage/ProductPage";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ClientOnly from "@/app/components/ClientOnly";

interface ProductDetailsProps {
  params: Params;
}
const ProductDetails: React.FC<ProductDetailsProps> = async ({ params }) => {
  const { id } = params;
  const currentUser = await getCurrentUser();

  return (
    <ClientOnly>
      <ProductPage userId={currentUser?.id} productId={id} />
    </ClientOnly>
  );
};

export default ProductDetails;
