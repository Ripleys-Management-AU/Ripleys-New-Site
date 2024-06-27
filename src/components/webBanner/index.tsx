import { webBannerImages } from "@/data/webBanner";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { GoDot } from "react-icons/go";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";

const WebBanner = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 8000 }),
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
    <div className="w-full overflow-hidden">
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
            {selectedIndex === item.id ? <GoDotFill /> : <GoDot />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WebBanner;
