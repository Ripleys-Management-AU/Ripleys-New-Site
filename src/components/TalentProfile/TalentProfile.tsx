import React from "react";

import {
  femaleTalentProfileData,
  maleTalentProfileData,
} from "@/data/talentProfileData";

import { TalentType } from "@/model/types";

interface props {
  talent: TalentType;
}

const TalentProfile: React.FC<props> = ({ talent }) => {
  const talentImage = talent?.talent_image
    ? `/uploads/thumbs/200x320-crop_${talent?.talent_image[0].filename}`
    : talent.gender === 1
      ? "/images/talent/default_person_women.jpeg"
      : "/images/talent/default_person_man.jpeg";

  const defaultImage =
    talent.gender === 1
      ? "/images/talent/default_person_woman.jpeg"
      : "/images/talent/default_person_man.jpeg";

  const talentProfileDataCols =
    talent.gender === 1 ? femaleTalentProfileData : maleTalentProfileData;

  const handleImageError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <div className="min-h-screen pt-20 lg:pt-48 flex flex-col items-center">
      <div className="w-4/5">
        <div className="hidden lg:grid grid-cols-10">
          <div className="col-span-3 flex justify-center">
            <img
              className="w-[200px] h-[320px]"
              src={talentImage}
              alt={`${talent.first_name} ${talent.last_name}`}
              onError={handleImageError}
              style={{
                maskImage:
                  "radial-gradient(circle at center 33%, white 42%, transparent 41%)",
                WebkitMaskImage:
                  "radial-gradient(circle at center 33%, white 42%, transparent 41%)",
              }}
            />
          </div>
          <div className="lg:col-span-7">
            <div className="w-full">
              <h1 className="text-3xl font-bold">
                {talent.first_name} {talent.last_name}
              </h1>
              <div className="mt-4">
                <div className="w-full grid grid-cols-2 gap-8 text-white mb-4">
                  {talentProfileDataCols.map((item, index) => {
                    const itemData = item
                      ? item.dbSubAttribute
                        ? talent[item.dbAttribute]?.[item.dbSubAttribute]
                        : talent[item.dbAttribute]
                      : null;
                    if (!itemData) return;
                    return (
                      <div key={index} className="w-3/4 grid grid-cols-2">
                        <div className="col-span-1 text-gray-500">
                          {item.display}
                        </div>
                        <div className="col-span-1">{itemData}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
