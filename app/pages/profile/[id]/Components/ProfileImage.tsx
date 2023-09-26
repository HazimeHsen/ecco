import Image from "next/image";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { UploadButton } from "@/utils/uploadthing";
import "@uploadthing/react/styles.css";
import axios from "axios";
import toast from "react-hot-toast";
import MenuItem from "@/app/components/navbar/MenuItem";
import { SimpleUser } from "../page";
interface ProfileImageProps {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updated: boolean;
  setUpdated: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
  user: SimpleUser | undefined;
}
const ProfileImage: React.FC<ProfileImageProps> = ({
  setIsLoading,
  setUpdated,
  updated,
  id,
  user,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = async () => {
    setIsOpen(!isOpen);
  };

  const deleteImage = async () => {
    try {
      setIsLoading(true);

      const response = await axios.put(
        `http://localhost:3000/api/users/image/${id}`,
        {
          image: "/images/placeholder.jpg",
        }
      );

      if (response.data) {
        toast.success("Profile Image Deleted Successfully");
      }

      if (response.data) {
        setUpdated(!updated);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <Image
        onClick={toggle}
        width={100}
        height={100}
        alt="..."
        src={user ? user.image : "/images/placeholder.jpg"}
        className="shadow-xl cursor-pointer object-cover -mt-[50%] rounded-full h-auto align-middle border-none "
      />
      <div className="absolute cursor-pointer -mt-[50%] top-0 font-extrabold right-0">
        <BiEdit size={25} />
      </div>
      {isOpen && (
        <div className="z-50 absolute rounded-xl shadow-md w-[200px] bg-white overflow-hidden -right-32 top-10 text-sm">
          <div className="flex flex-col cursor-pointer overflow-hidden">
            {
              <>
                <UploadButton
                  content={{
                    button({ ready }) {
                      if (ready) return <div>Change Photo</div>;

                      return "Change Photo";
                    },
                  }}
                  className={
                    "px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                  }
                  appearance={{
                    button({ ready, isUploading }) {
                      return `custom-button`;
                    },
                    container: "custom-container",
                    allowedContent: {
                      display: "none",
                    },
                  }}
                  ut-label="Change Image"
                  endpoint="userImage"
                  onClientUploadComplete={async (res) => {
                    setIsLoading(true);

                    const response = await axios.put(
                      `http://localhost:3000/api/users/image/${id}`,
                      {
                        image: res ? res[0].fileUrl : "/images/placeholder.jpg",
                      }
                    );

                    if (response.data) {
                      toast.success("Profile Image Updated Successfully");
                    }

                    if (response.data) {
                      setUpdated(!updated);
                    }
                  }}
                  onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <hr />
                <MenuItem label="Delete photo" onClick={deleteImage} />
              </>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileImage;
