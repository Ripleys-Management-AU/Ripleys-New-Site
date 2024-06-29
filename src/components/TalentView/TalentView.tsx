import React from "react";

import { TalentType } from "@/model/types";
import TalentCard from "@/components/TalentView/TalentCard/TalentCard";

interface props {
  talents: TalentType[];
}

const TalentView: React.FC<props> = ({ talents }) => {
  return (
    <div className="w-full flex justify-center">
      <div className="min-h-screen mt-20 lg:mt-40 w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center w-full">
          {talents?.map((talent) => (
            <div key={talent.id} className="w-full">
              <TalentCard talent={talent} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TalentView;
