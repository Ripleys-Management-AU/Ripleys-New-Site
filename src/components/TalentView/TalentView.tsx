import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import ReactPaginate from "react-paginate";

import TalentCard from "@/components/TalentView/TalentCard/TalentCard";

import config from "@/config/config";
import { FEMALE, MALE } from "@/constants";
import { TalentType } from "@/model/types";

interface props {
  talentFullImage: TalentType | null;
  setTalentFullImage: Dispatch<TalentType | null>;
}

const TalentView: React.FC<props> = ({
  talentFullImage,
  setTalentFullImage,
}) => {
  const [talents, setTalents] = useState<TalentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, SetCurrentPage] = useState<number>(1);

  const router = useRouter();

  const handlePageChange = async () => {};

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
    <div className="w-full flex flex-col items-center min-h-[60vh] mt-20 lg:mt-44">
      <div className="w-4/5">
        {loading ? (
          <div className="w-full min-h-[60vh] flex items-center justify-center">
            <Blocks
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              visible={true}
            />
          </div>
        ) : (
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
        )}
      </div>
      {/*{talentFullImage && <div>{talentFullImage.first_name}</div>}*/}
      {/*<div>*/}
      {/*  <ReactPaginate*/}
      {/*    breakLabel="..."*/}
      {/*    nextLabel="next >"*/}
      {/*    onPageChange={() => {}}*/}
      {/*    pageRangeDisplayed={5}*/}
      {/*    pageCount={100}*/}
      {/*    previousLabel="< previous"*/}
      {/*    renderOnZeroPageCount={null}*/}
      {/*    className="bg-button-bg-hover"*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};

export default TalentView;
