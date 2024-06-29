import React from "react";
import { IoMdShare } from "react-icons/io";
import { MdKeyboardArrowRight, MdMail } from "react-icons/md";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

import GrayButton from "@/components/GrayButton/GrayButton";

const TalentCardSkeleton = () => {
  return (
    <div className="rounded-lg bg-card-bg p-4 w-full border border-gray-500 text-white">
      <div className="flex w-full">
        <Skeleton
          height="140px"
          width="96px"
          baseColor="#2c2d31"
          highlightColor="#3c3d42"
          className="rounded-lg"
        />
        <div className="pl-4 w-full">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-lg font-semibold">
              <Skeleton
                height="15px"
                width="150px"
                baseColor="#2c2d31"
                highlightColor="#3c3d42"
                className="rounded-lg"
              />
            </h1>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex flex-col justify-center items-center">
                <Skeleton
                  height="12px"
                  width="40px"
                  baseColor="#2c2d31"
                  highlightColor="#3c3d42"
                  className="rounded-lg"
                />
                <Skeleton
                  height="12px"
                  width="60px"
                  baseColor="#2c2d31"
                  highlightColor="#3c3d42"
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <Skeleton
                  height="12px"
                  width="40px"
                  baseColor="#2c2d31"
                  highlightColor="#3c3d42"
                  className="rounded-lg"
                />
                <Skeleton
                  height="12px"
                  width="60px"
                  baseColor="#2c2d31"
                  highlightColor="#3c3d42"
                  className="rounded-lg"
                />
              </div>
              <div className="flex flex-col justify-center items-center">
                <Skeleton
                  height="12px"
                  width="40px"
                  baseColor="#2c2d31"
                  highlightColor="#3c3d42"
                  className="rounded-lg"
                />
                <Skeleton
                  height="12px"
                  width="60px"
                  baseColor="#2c2d31"
                  highlightColor="#3c3d42"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-end items-center gap-2">
            <GrayButton className="mt-2">
              <MdMail />
            </GrayButton>
            <GrayButton className="mt-2">
              <IoMdShare />
            </GrayButton>
            <GrayButton className="mt-2">
              <MdKeyboardArrowRight />
            </GrayButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCardSkeleton;
