import { Talent } from "@/model/types";
import React from "react";

interface props {
  talent: Talent;
}

const TalentCard: React.FC<props> = ({ talent }) => {
  const talentImage = talent?.talent_image
    ? `/uploads/${talent?.talent_image[0].filename}`
    : talent.gender === 1
      ? "/images/talent/default_person_women.jpeg"
      : "/images/talent/default_person_man.jpeg";

  const defaultImage =
    talent.gender === 1
      ? "/images/talent/default_person_women.jpeg"
      : "/images/talent/default_person_man.jpeg";

  return (
    <div className="rounded-lg bg-card-bg p-4 w-full border border-gray-500 overflow-hidden hover:translate-y-[-5px] duration-200 cursor-pointer">
      <div className="flex w-full">
        <img
          src={talentImage}
          alt={`${talent.first_name} ${talent.last_name}`}
          className="h-[150px] w-[100px] rounded-lg"
          // style={{
          //   maskImage:
          //     "radial-gradient(circle at center 38%, white 50%, transparent 41%)",
          //   WebkitMaskImage:
          //     "radial-gradient(circle at center 38%, white 50%, transparent 41%)",
          // }}
        />
        <div className="pl-4 w-full">
          <div className="w-full flex flex-col items-center">
            <h1 className="text-lg font-semibold">
              {talent.first_name} {talent.last_name}
            </h1>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div className="flex flex-col justify-center items-center">
                <p>Gender</p>
                <p className="text-gray-400">
                  {talent.gender === 1 ? "Female" : "Male"}
                </p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Ethnicity</p>
                <p className="text-gray-400">{talent.ethnicity?.name}</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <p>Height</p>
                <p className="text-gray-400">{talent.height}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;
