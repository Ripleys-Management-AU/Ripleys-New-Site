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
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const router = useRouter();

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
            `${config.baseUrl}/api/talent?skip=${currentPage * config.talentPerPage}&&take=9`,
          );
          data = res.data.talents;
          count = res.data.count;
        }
        if (router.query.gender) {
          const res = await axios.get(
            `${config.baseUrl}/api/talent?skip=${currentPage * config.talentPerPage}&&take=9&&gender=${router.query.gender === "female" ? FEMALE : MALE}`,
          );
          data = res.data.talents;
          count = res.data.count;
        }

        if (router.query.type) {
          const res = await axios.get(
            `${config.baseUrl}/api/talent?skip=${currentPage * config.talentPerPage}&&take=9&&type=${router.query.type}`,
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
      <div className="w-4/5">
        {loading ? (
          <div className="w-full flex items-center justify-center min-h-[50vh]">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 place-items-center w-full  min-h-[40vh]">
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
      {!loading && totalPage > 0 && (
        <div className="mt-20">
          <ReactPaginate
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={totalPage}
            forcePage={currentPage}
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            renderOnZeroPageCount={null}
            containerClassName="flex justify-center items-center gap-2 font-mono"
            pageClassName="page-item"
            pageLinkClassName="px-3 py-1 bg-secondary-white border border-tertiary-white text-white hover:bg-primary-white duration-200 font-semibold rounded"
            previousClassName="page-item"
            previousLinkClassName="px-3 py-1 bg-secondary-white border border-tertiary-white text-white hover:bg-primary-white duration-200 font-semibold rounded"
            nextClassName="page-item"
            nextLinkClassName="px-3 py-1 bg-secondary-white border border-tertiary-white text-white hover:bg-primary-white duration-200 font-semibold rounded"
            breakClassName="page-item"
            breakLinkClassName="px-3 py-1 bg-secondary-white border border-tertiary-white text-white hover:bg-primary-white duration-200 font-semibold rounded"
            activeLinkClassName="!bg-primary-white"
          />
        </div>
      )}
    </div>
  );
};

export default TalentView;
