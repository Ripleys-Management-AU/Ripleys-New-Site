import { useRouter } from "next/router";
import React, { Dispatch } from "react";
import { IoMdShare } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdMail } from "react-icons/md";

import GrayButton from "@/components/GrayButton/GrayButton";

import { TalentType } from "@/model/types";
import { calculateAge, mapAgeToAgeRange } from "@/utils/talent";

interface props {
  talent: TalentType;
  setShowFullImages: Dispatch<null | TalentType>;
}

const TalentCard: React.FC<props> = ({ talent, setShowFullImages }) => {
  const talentImage = talent?.talent_image
    ? `/uploads/${talent?.talent_image[0].filename}`
    : talent.gender === 1
      ? "/images/talent/default_person_women.jpeg"
      : "/images/talent/default_person_man.jpeg";

  const defaultImage =
    talent.gender === 1
      ? "/images/talent/default_person_women.jpeg"
      : "/images/talent/default_person_man.jpeg";

  const router = useRouter();

  return (
    <div className="rounded-lg bg-card-bg p-4 w-full border border-gray-500 hover:translate-y-[-5px] duration-200 text-white">
      <div className="flex w-full">
        <img
          src={talentImage}
          alt={`${talent.first_name} ${talent.last_name}`}
          className="h-[150px] w-[100px] rounded-lg duration-200"
          // style={{
          //   maskImage:
          //     "radial-gradient(circle at center 38%, white 50%, transparent 41%)",
          //   WebkitMaskImage:
          //     "radial-gradient(circle at center 38%, white 50%, transparent 41%)",
          // }}
          onClick={() => {
            setShowFullImages(talent);
          }}
        />
        <div className="pl-4 w-full">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-lg font-semibold">
              {talent.first_name} {talent.last_name}
            </h1>
            <div className="grid grid-cols-2 gap-12 mt-4">
              <div className="flex flex-col justify-center items-center">
                <p>Gender</p>
                <p className="text-gray-400">
                  {talent.gender === 1 ? "Female" : "Male"}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Age</p>
                <p className="text-gray-400">
                  {talent.birth_date &&
                    mapAgeToAgeRange(calculateAge(talent.birth_date))}
                </p>
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
            <GrayButton
              className="mt-2"
              onClick={() => {
                router.push(`/talent/${talent.id}`);
              }}
            >
              <MdKeyboardArrowRight />
            </GrayButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;
