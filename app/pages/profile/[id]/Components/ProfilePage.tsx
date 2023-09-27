"use client";
import { Order, Product, Reviews } from "@prisma/client";
import axios from "axios";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import isErrorResponse from "@/app/CatchError/CatchError";
import Cookies from "js-cookie";
import { MdEmail } from "react-icons/md";
import Loader from "@/app/components/Loader/Loader";
import ClientOnly from "@/app/components/ClientOnly";
import EditForm from "./EditForm";
import AddressInformation from "./AddressInformation";
import OrdersTable from "./OrdersTable";
import ProfileImage from "./ProfileImage";
import { SafeUser } from "@/app/types";
import { redirect } from "next/navigation";

export interface SimpleUser {
  name: string;
  email: string;
  image: string;
  createdAt: string;
}

const ProfilePage = ({
  params,
  currentUser,
}: {
  params: Params;
  currentUser?: SafeUser | null;
}) => {
  const [user, setUser] = useState<SimpleUser | undefined>();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [updated, setUpdated] = useState<boolean>(false);
  console.log(currentUser);

  useEffect(() => {
    if (!currentUser) {
      redirect("/");
    }
    if (currentUser?.id != params.id) {
      redirect("/");
    }
  }, [currentUser]);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/users/${params.id}`);
        setUser(data.user);
        setOrders(data.orders);
        setReviews(data.reviews);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        if (isErrorResponse(error)) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    };
    getData();
  }, [updated]);

  const [favoriteItems, setFavoriteItems] = useState<Product[]>([]);

  useEffect(() => {
    const favoritesCookieValue = Cookies.get("favorites");
    const parsedFavoriteItems: Product[] = favoritesCookieValue
      ? JSON.parse(favoritesCookieValue).favoriteItems
      : [];
    setFavoriteItems(parsedFavoriteItems);
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<
    {
      fileUrl: string;
      fileKey: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(() => images.length === 0 || false);

  return (
    <ClientOnly>
      {isLoading ? (
        <Loader
          fill="black"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      ) : (
        <section className="relative py-8 bg-blueGray-200">
          <div className="mx-auto ">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
              <div className="md:px-6 px-4 pb-8">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <ProfileImage
                      id={params.id}
                      setIsLoading={setIsLoading}
                      setUpdated={setUpdated}
                      updated={updated}
                      user={user}
                    />
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 flex items-center justify-center lg:justify-end w-full lg:text-right">
                      <div className="font-bold mr-1">User From:</div>
                      <div className="font-semibold text-gray-600">
                        {user?.createdAt.slice(0, 10)}
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 pt-0 lg:pt-4">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {orders && orders.length}
                        </span>
                        <span className="text-sm text-gray-600">Orders</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {reviews && reviews.length}
                        </span>
                        <span className="text-sm text-gray-600">Reviews</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {favoriteItems && favoriteItems.length}
                        </span>
                        <span className="text-sm text-gray-600">Favorites</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-5">
                  <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                    {user?.name}
                  </h3>
                  <div className="text-sm leading-normal flex items-center justify-center mt-0 mb-2 text-gray-600 font-bold ">
                    <div className="mr-2 text-lg text-gray-600">
                      <MdEmail />
                    </div>
                    {user && user.email}
                  </div>
                </div>
                <div className="mt-10 flex flex-wrap py-10 border-t border-b border-blueGray-200 ">
                  <div className="md:w-1/2 w-full md:border-r border-b border-blueGray-200 ">
                    <EditForm
                      id={params.id}
                      images={images}
                      setUpdated={setUpdated}
                      updated={updated}
                      user={user}
                    />
                  </div>
                  <div className="md:w-1/2 w-full px-4 md:mt-0 mt-8">
                    <AddressInformation />
                  </div>
                </div>
                <div className="md:w-1/2 w-full px-4 py-8">
                  <OrdersTable data={orders} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </ClientOnly>
  );
};

export default ProfilePage;
