import axios from "axios";
import { useRouter } from "next/router";
import React, { Dispatch, useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import { useMediaQuery } from "react-responsive";

import TalentCard from "@/components/TalentsView/TalentCard/TalentCard";

import config from "@/config/config";
import { FEMALE, MALE } from "@/constants";
import { TalentType } from "@/model/types";

interface props {
  talentFullImage: TalentType | null;
  setTalentFullImage: Dispatch<TalentType | null>;
}

const TalentsView: React.FC<props> = ({
  talentFullImage,
  setTalentFullImage,
}) => {
  const [talents, setTalents] = useState<TalentType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const router = useRouter();

  const isSmallScreen = useMediaQuery({ query: "(max-width: 639px)" });
  const isMediumScreen = useMediaQuery({
    query: "(min-width: 640px) and (max-width: 767px)",
  });

  const pageRangeDisplayed = isSmallScreen ? 1 : isMediumScreen ? 3 : 5;

  const handlePageChange = (selectedItem: { selected: number }) => {
    const { selected } = selectedItem;
    setCurrentPage(selected);
  };

  useEffect(() => {
    const fetchTalents = async () => {
      console.log("current page", currentPage);
      try {
        setLoading(true);
        let data = [];
        let count = 0;
        if (!router.query.gender && !router.query.type) {
          const res = await axios.get(
            `/api/talent?skip=${currentPage * config.talentPerPage}&&take=9`,
          );
          data = res.data.talents;
          count = res.data.count;
        }
        if (router.query.gender) {
          const res = await axios.get(
            `/api/talent?skip=${currentPage * config.talentPerPage}&&take=9&&gender=${router.query.gender === "female" ? FEMALE : MALE}`,
          );
          data = res.data.talents;
          count = res.data.count;
        }

        if (router.query.type) {
          const res = await axios.get(
            `/api/talent?skip=${currentPage * config.talentPerPage}&&take=9&&type=${router.query.type}`,
          );
          data = res.data.talents;
          count = res.data.count;
        }
        setTalents(data);
        setLoading(false);
        setTotalPage(Math.ceil(count / config.talentPerPage));
      } catch (err) {
        setError("Failed to load talents");
        setLoading(false);
      }
    };

    fetchTalents();
  }, [router.query.gender, router.query.type, currentPage]);

  return (
    <div className="w-full flex flex-col items-center min-h-[60vh] pt-20 lg:pt-44">
      <div className="w-4/5 min-h-[64vh]">
        {loading ? (
          <div className="w-full min-h-[64vh] flex items-center justify-center">
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
      {totalPage > 0 && (
        <div className="mt-20">
          <ReactPaginate
            onPageChange={handlePageChange}
            pageRangeDisplayed={pageRangeDisplayed}
            pageCount={totalPage}
            forcePage={currentPage}
            previousLabel="<"
            nextLabel=">"
            breakLabel={isSmallScreen ? ".." : "..."}
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center items-center gap-1 md:gap-2 font-mono"
            pageClassName="page-item"
            pageLinkClassName="md:text-[15px] text-[12px] px-2 md:px-3 py-1 bg-secondary-white border border-tertiary-white text-white hover:bg-primary-white duration-200 font-semibold rounded"
            previousClassName="page-item"
            previousLinkClassName="md:text-[15px] text-[12px] px-2 md:px-3 py-1 bg-secondary-white border border-tertiary-white text-white hover:bg-primary-white duration-200 font-semibold rounded"
            nextClassName="page-item"
            nextLinkClassName="md:text-[15px] text-[12px] px-2 md:px-3 py-1 bg-secondary-white border border-tertiary-white text-white hover:bg-primary-white duration-200 font-semibold rounded"
            breakClassName="page-item"
            breakLinkClassName="md:text-[15px] text-[12px] px-2 md:px-3 py-1 bg-secondary-white border border-tertiary-white text-white hover:bg-primary-white duration-200 font-semibold rounded"
            activeLinkClassName="!bg-primary-white"
          />
        </div>
      )}
    </div>
  );
};

export default TalentsView;
