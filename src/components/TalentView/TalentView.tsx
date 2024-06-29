import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import TalentCard from "@/components/TalentView/TalentCard/TalentCard";
import TalentCardSkeleton from "@/components/TalentView/TalentCardSkeleton/TalentCardSkeleton";

import config from "@/config/config";
import { FEMALE, MALE } from "@/constants";
import { TalentType } from "@/model/types";

const TalentView: React.FC = () => {
  const [talents, setTalents] = useState<TalentType[]>([]);
  const [talentFullImage, setTalentFullImage] = useState<null | TalentType>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, SetCurrentPage] = useState<number>(1);

  const router = useRouter();

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        setLoading(true);
        let data = [];
        if (!router.query.gender && !router.query.type) {
          const res = await axios.get(
            `${config.baseUrl}/api/talent?skip=0&&take=9`,
          );
          data = res.data.talents;
        }
        if (router.query.gender) {
          const res = await axios.get(
            `${config.baseUrl}/api/talent?skip=0&&take=9&&gender=${router.query.gender === "female" ? FEMALE : MALE}`,
          );
          data = res.data.talents;
        }

        if (router.query.type) {
          const res = await axios.get(
            `${config.baseUrl}/api/talent?skip=0&&take=9&&type=${router.query.type}`,
          );
          data = res.data.talents;
        }
        setTalents(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load talents");
        setLoading(false);
      }
    };

    fetchTalents();
  }, [router.query.gender, router.query.type]);

  return (
    <div className="w-full flex justify-center">
      <div className="min-h-screen mt-20 lg:mt-44 w-4/5">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center w-full">
          {loading
            ? [...Array(config.talentPerPage)].map((_, index) => (
                <TalentCardSkeleton key={index} />
              ))
            : talents?.map((talent) => (
                <div key={talent.id} className="w-full">
                  <TalentCard
                    talent={talent}
                    setShowFullImages={setTalentFullImage}
                  />
                </div>
              ))}
        </div>
      </div>
      {/*{talentFullImage && <div>{talentFullImage.first_name}</div>}*/}
    </div>
  );
};

export default TalentView;
