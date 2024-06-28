import { webBannerImages } from "@/data/webBannerData";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";

const WebBanner = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 5000 }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = () => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  };

  return (
    <section className="w-full overflow-hidden mt-16 lg:mt-32">
      <div className="embla w-full" ref={emblaRef}>
        <div className="embla__container">
          {webBannerImages.map((item) => (
            <div key={item.id} className="embla__slide">
              <img src={item.image} alt={item.desc} className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-end py-2 px-2">
        {webBannerImages.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              scrollTo(item.id);
            }}
            className="cursor-pointer"
          >
            {selectedIndex === item.id ? (
              <GoDotFill color={"white"} />
            ) : (
              <GoDot color={"white"} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WebBanner;
