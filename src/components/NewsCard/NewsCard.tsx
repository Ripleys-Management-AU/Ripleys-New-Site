import React from "react";
import parse from "react-html-parser";
import { MdKeyboardArrowRight } from "react-icons/md";

import config from "@/config/config";
import { NewsPayload } from "@/model/types";

interface Props {
  news: NewsPayload;
}

const NewsCard: React.FC<Props> = ({ news }) => {
  return (
    <div className="bg-card-bg text-white rounded-lg overflow-hidden min-h-[60vh] lg:min-h-[50vh] shadow-lg border border-gray-500 cursor-pointer relative">
      <div className="h-[23vh] overflow-hidden border-b border-gray-500 ">
        <img
          src={`${config.uploadPrefix}/${news.blog_post_image_blog_post_image_blog_post_idToblog_post[0].filename}`}
          className="object-cover w-full h-full hover:scale-110 duration-500"
        />
      </div>
      <div className="px-8 py-8">
        <h1 className="text-2xl font-semibold">{news.title}</h1>
        <div className="mt-4">{parse(news.summary)}</div>
      </div>
      <div className="absolute right-4 bottom-4">
        <button className="bg-button-bg rounded-lg p-2 cursor-pointer hover:bg-button-bg-hover duration-200 mt-2">
          <MdKeyboardArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default NewsCard;
