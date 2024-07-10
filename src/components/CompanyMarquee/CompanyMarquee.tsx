import React from "react";
import Marquee from "react-fast-marquee";

import { LogoType } from "@/data/data";

interface Props {
  logos: LogoType[];
  direction?: "left" | "right" | "up" | "down";
  title?: string;
}

const CompanyMarquee: React.FC<Props> = ({ logos, direction, title }) => {
  return (
    <div className="text-center mt-4">
      {title && (
        <h1 className="uppercase text-4xl font-semibold text-gray-300 mb-12">
          {title}
        </h1>
      )}
      <Marquee direction={direction ? direction : "left"}>
        {logos.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.desc}
            className="h-[80px] mr-16"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default CompanyMarquee;
