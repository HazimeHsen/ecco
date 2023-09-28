import React, { useEffect, useState } from "react";
import "./style.css";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import Button from "../Button";
import { toast } from "react-hot-toast";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Reviews } from "@prisma/client";
interface RatingProps {
  userId?: string;
  productId: string;
  reviews: Reviews[];
  rating?: number;
  setRating?: (arg: number) => void;
  touchable?: boolean;
  changed: boolean;
  setChanged: React.Dispatch<React.SetStateAction<boolean>>;
}
const Rating: React.FC<RatingProps> = ({
  userId,
  productId,
  reviews,
  setChanged,
  changed,
  touchable = false,
}) => {
  const [rating, setRating] = useState(0);
  const [userReview, setUserReview] = useState(false);
  const [isLoading, SetIsLoading] = useState(false);
  const [isTouchable, setIsTouchable] = useState(touchable);
  useEffect(() => {
    const getRating = async () => {
      try {
        console.log("review");
        const data = reviews.filter((review) => review.productId === productId);

        if (data) {
          let rating: number[] = [];

          data.map((rev: { rating: number }) => rating.push(rev.rating));

          const ratingData = rating.reduce((a: number, c: number) => a + c, 0);

          setRating?.(ratingData / rating.length);

          // Check if userId is undefined and set isTouchable to false
          if (userId === undefined) {
            setIsTouchable(false);
          } else {
            setIsTouchable(true);
            setRating(0);
          }

          if (data) {
            const user = data.map(
              (rev: { userId: string | undefined; id: string | undefined }) => {
                if (rev.userId === userId) {
                  return true;
                } else {
                  return false;
                }
              }
            );

            const hasUserReviewed = user.some(
              (reviewed: boolean) => reviewed === true
            );
            setUserReview(hasUserReviewed);

            if (userReview) {
              setRating?.(ratingData / rating.length);
              setIsTouchable(false);
            }
          }
        }
      } catch (error) {
        toast.error("Something went Wrong.");
      }
    };
    getRating();
  }, [userReview, userId]);

  if (rating < 0) {
    setRating?.(0);
  }

  const handleReview = (rate: number) => {
    if (isTouchable) {
      if (userId) {
        if (userReview) {
          return;
        } else {
          setRating?.(rate);
        }
      } else {
        return;
      }
    }
  };

  console.log("hello hi");

  const submitreview = async () => {
    if (rating <= 0) {
      toast.error("You should rate to review ");
      return;
    }
    try {
      SetIsLoading(true);

      await axios.post("/api/review", {
        rating,
        userId,
        productId,
      });
      setChanged(!changed);
      setRating?.(0);
      setIsTouchable(false);
      setUserReview(true);
      toast.success("Review Submitted");
      SetIsLoading(false);
    } catch (error) {
      SetIsLoading(false);
      toast.error("You should Login and rate to review ");
    }
  };

  return (
    <div className="flex items-center">
      <div className={"flex rating"}>
        <span
          className={isTouchable ? "cursor-pointer" : ""}
          onClick={() => handleReview(1)}>
          {rating >= 1 ? (
            <BsStarFill />
          ) : rating >= 0.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span
          className={isTouchable ? "cursor-pointer" : ""}
          onClick={() => handleReview(2)}>
          {rating >= 2 ? (
            <BsStarFill />
          ) : rating >= 1.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span
          className={isTouchable ? "cursor-pointer" : ""}
          onClick={() => handleReview(3)}>
          {rating >= 3 ? (
            <BsStarFill />
          ) : rating >= 2.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span
          className={isTouchable ? "cursor-pointer" : ""}
          onClick={() => handleReview(4)}>
          {rating >= 4 ? (
            <BsStarFill />
          ) : rating >= 3.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
        <span
          className={isTouchable ? "cursor-pointer" : ""}
          onClick={() => handleReview(5)}>
          {rating >= 5 ? (
            <BsStarFill />
          ) : rating >= 4.5 ? (
            <BsStarHalf />
          ) : (
            <BsStar />
          )}
        </span>
      </div>
      {isTouchable && !userReview && userId && (
        <div className="ml-2">
          <button
            className="bg-gray-600 w-[80px] flex justify-center items-center text-white fw-semibold px-4 py-2 rounded disabled:cursor-not-allowed"
            disabled={
              userReview ||
              isLoading ||
              (rating <= 0 ? true : false) ||
              (userId ? false : true)
            }
            onClick={submitreview}>
            {isLoading ? (
              <Loader
                fill="white"
                className="!w-[30px] !h-[30px] flex justify-center items-center"
              />
            ) : (
              "Review"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Rating;
