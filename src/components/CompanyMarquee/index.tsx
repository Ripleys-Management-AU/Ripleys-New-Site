import Marquee from "react-fast-marquee";
import { companyLogos } from "@/data/companyLogos";

const CompanyMarquee = () => {
  return (
    <div className="text-center my-4">
      <h1 className="uppercase text-4xl font-semibold text-gray-300 mb-8">
        Who We&apos;Re Working With
      </h1>
      <Marquee>
        {companyLogos.map((item) => (
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
