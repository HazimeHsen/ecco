import ClientOnly from "@/app/components/ClientOnly";
import React from "react";
import ProfilePage from "./Components/ProfilePage";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import getCurrentUser from "@/app/actions/getCurrentUser";

const page = async ({ params }: { params: Params }) => {
  const currentUser = await getCurrentUser();
  return (
    <ClientOnly>
      <ProfilePage params={params} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default page;
