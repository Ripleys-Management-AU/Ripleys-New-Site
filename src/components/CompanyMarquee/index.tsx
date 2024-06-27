import Marquee from "react-fast-marquee";
import { companyLogos } from "@/data/companyLogos";

const CompanyMarquee = () => {
  return (
    <div>
      <Marquee>
        {companyLogos.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.desc}
            className="h-[100px] mr-16"
          />
        ))}
      </Marquee>
    </div>
  );
};

export default CompanyMarquee;
