import Image from "next/image";

import { sectionCards } from "@/data/sectionCardData";
import Stars from "@/components/Stars/Stars";

const SectionCards = () => {
  return (
    <section className="bg-dark-green w-full flex justify-center py-12">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 w-4/5">
        {sectionCards.map((item) => (
          <div key={item.id} className="cursor-pointer relative">
            <Image src={item.image} alt={item.desc} width={359} height={359} />
            {item.id === 0 && (
              <div className="hidden md:block absolute top-[-35px] left-[-45px] z-[100] rotate-[50deg]">
                <div className="relative">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    height={110}
                    width={110}
                  />
                  <div className="absolute top-[-10px] left-[-10px] rotate-[160deg]">
                    <Stars />
                  </div>
                </div>
              </div>
            )}
            {item.id === 2 && (
              <div className="hidden md:block absolute bottom-[-35px] right-[-45px] z-[100] rotate-[-50deg]">
                <div className="relative">
                  <Image
                    src="/images/logo.png"
                    alt="logo"
                    height={110}
                    width={110}
                  />
                  <div className="absolute top-[-10px] left-[-10px] rotate-[160deg]">
                    <Stars />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
