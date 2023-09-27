import LoadingSvg from "@/app/components/Loading/Loading";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { User } from "@prisma/client";
import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { SimpleUser } from "./ProfilePage";
interface FormData {
  name: string;
  email: string;
  password: string;
}

interface EditFormProps {
  user: SimpleUser | undefined;
  id: string;
  updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  images: Image[];
}
interface Image {
  fileUrl: string;
  fileKey: string;
}
const EditForm: React.FC<EditFormProps> = ({
  user,
  id,
  updated,
  setUpdated,
  images,
}) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: user?.email,
      name: user?.name,
    },
  });

  const onSubmit = async (d: FormData) => {
    if (d) {
      try {
        setLoading(true);
        console.log(images);

        const response = await axios.put(`/api/users?id=${id}`, {
          name: d.name,
          email: d.email,
          password: d.password,
          image: images[0] ? images[0].fileUrl : user?.image,
        });

        if (response.data) {
          toast.success(response.data.message);
        }

        signIn("credentials", {
          ...d,
          redirect: false,
        }).then((callback: any) => {
          setLoading(false);

          if (callback?.error) {
            toast.error(callback.error);
          }
        });

        if (response.data) {
          reset();
          setLoading(false);
          setUpdated(!updated);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="text-xl md:text-3xl font-bold mb-2 px-4">Edit Profile</h1>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center flex-wrap gap-4 px-4 py-4">
          <div className="w-full">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              defaultValue={user?.name}
              type="text"
              id="name"
              className="w-full"
              {...register("name", {
                required: "Name is required",
              })}
            />
            {errors.name && (
              <span className="text-red-500 w-full">
                {errors.name.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              defaultValue={user?.email}
              type="text"
              id="email"
              className="w-full"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <span className="text-red-500 w-full">
                {errors.email.message as string}
              </span>
            )}
          </div>
          <div className="w-full">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              type="text"
              id="password"
              className="w-full"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="text-red-500 w-full">
                {errors.password.message as string}
              </span>
            )}
          </div>

          <Button
            disabled={loading}
            className={`relative ${
              loading ? "disabled:cursor-not-allowed bg-gray-800 " : ""
            } w-full`}
            type="submit">
            {loading ? <LoadingSvg inBox /> : "Submit"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditForm;
