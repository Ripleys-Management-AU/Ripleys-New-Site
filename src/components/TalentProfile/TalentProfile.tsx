import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

import {
  femaleTalentProfileColsData,
  maleTalentProfileColsData,
} from "@/data/talentProfileData";

import ImageWindow from "@/components/ImageWindow/ImageWindow";

import config from "@/config/config";
import { TalentType } from "@/model/types";

interface props {
  talent: TalentType;
}

const TalentProfile: React.FC<props> = ({ talent }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(
    null,
  );
  const imagePaths = talent?.talent_image
    ? talent.talent_image
        .map((item) => {
          if (!item.filename) return;
          return item.filename;
        })
        .filter((filename): filename is string => !!filename)
    : [];

  const talentImage = talent?.talent_image
    ? `${config.uploadPrefix}/thumbs/200x320-crop_${talent?.talent_image[0].filename}`
    : talent.gender === 1
      ? "/images/talent/default_person_women.jpeg"
      : "/images/talent/default_person_man.jpeg";

  const defaultImage =
    talent.gender === 1
      ? "/images/talent/default_person_woman.jpeg"
      : "/images/talent/default_person_man.jpeg";

  const talentProfileDataCols =
    talent.gender === 1
      ? femaleTalentProfileColsData
      : maleTalentProfileColsData;

  const handleImageError = (e: any) => {
    e.target.src = defaultImage;
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-52 flex flex-col items-center text-white">
      <AnimatePresence>
        {currentImageIndex !== null && (
          <ImageWindow
            imagePaths={imagePaths}
            currentImageIndex={currentImageIndex}
            setCurrentImageIndex={setCurrentImageIndex}
          />
        )}
      </AnimatePresence>
      <div className="lg:hidden block">
        <img
          src={talentImage}
          alt={`${talent.first_name} ${talent.last_name}`}
          onError={handleImageError}
          className="w-[100vw]"
          style={{
            maskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
        />
      </div>
      <div className="w-4/5">
        <div className="lg:grid lg:grid-cols-12">
          <div className="hidden lg:flex lg:col-span-3 justify-start">
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
          <div className="lg:col-span-9">
            <div className="w-full">
              <h1 className="mt-12 lg:mt-0 text-3xl font-bold">
                {talent.first_name} {talent.last_name}
              </h1>
              <div className="mt-8">
                <div className="w-full grid grid-cols-2 gap-8 text-white mb-4">
                  {talentProfileDataCols.map((item, index) => {
                    const itemData = item
                      ? item.dbSubAttribute
                        ? (
                            talent[item.dbAttribute as keyof TalentType] as any
                          )?.[item.dbSubAttribute as keyof TalentType]
                        : talent[item.dbAttribute as keyof TalentType]
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
        <div className="mt-4 w-full">
          <h1 className="mt-12 lg:mt-0 text-3xl font-bold">Photos</h1>
          <div className="mt-8 w-full flex flex-wrap gap-1">
            {talent.talent_image?.map((item, index) => (
              <img
                key={index}
                src={`${config.uploadPrefix}/${item.filename}`}
                className="h-[150px] lg:h-[320px] rounded-[5px] cursor-pointer hover:filter hover:brightness-75 duration-200"
                onClick={() => {
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentProfile;
