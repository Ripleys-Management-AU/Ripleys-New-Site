import Image from "next/image";
import { sectionCards } from "@/data/sectionCardData";

const SectionCards = () => {
  return (
    <section className="w-full flex justify-center py-12">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 w-4/5">
        {sectionCards.map((item) => (
          <div key={item.id} className="cursor-pointer">
            <Image src={item.image} alt={item.desc} width={359} height={359} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
