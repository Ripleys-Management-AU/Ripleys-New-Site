import React, { useState } from "react";

import { TalentType } from "@/model/types";
import TalentCard from "@/components/TalentView/TalentCard/TalentCard";

interface props {
  talents: TalentType[];
}

const TalentView: React.FC<props> = ({ talents }) => {
  const [talentFullImage, setTalentFullImage] = useState<null | TalentType>(
    null,
  );
  const [currentPage, SetCurrentPage] = useState<number>(1);

  return (
    <div className="w-full flex justify-center">
      <div className="min-h-screen mt-20 lg:mt-44 w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center w-full">
          {talents?.map((talent) => (
            <div key={talent.id} className="w-full">
              <TalentCard
                talent={talent}
                setShowFullImages={setTalentFullImage}
              />
            </div>
          ))}
        </div>
      </div>
      {talentFullImage && <div>{talentFullImage.first_name}</div>}
    </div>
  );
};

export default TalentView;
