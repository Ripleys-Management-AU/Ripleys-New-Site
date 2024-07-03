import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import React, { Dispatch, useEffect } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";

import config from "@/config/config";

interface props {
  imagePaths: string[];
  currentImageIndex: number | null;
  setCurrentImageIndex: Dispatch<number | null>;
}

const ImageWindow: React.FC<props> = ({
  imagePaths,
  currentImageIndex,
  setCurrentImageIndex,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi || currentImageIndex === null) return;
    emblaApi.scrollTo(currentImageIndex, true);
  }, [emblaApi]);

  const scrollPrev = () => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    setCurrentImageIndex(emblaApi.selectedScrollSnap());
  };
  const scrollNext = () => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    setCurrentImageIndex(emblaApi.selectedScrollSnap());
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 w-full h-screen bg-black bg-opacity-50 z-[999]"
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="fixed top-4 right-4 cursor-pointer z-[1000]"
        onClick={() => {
          setCurrentImageIndex(null);
        }}
      >
        <IoCloseSharp size={40} color={"white"} />
      </div>
      <div
        className="fixed top-[50%] left-4 cursor-pointer z-[1000]"
        onClick={() => {
          scrollPrev();
        }}
      >
        <GrPrevious size={40} color={"white"} />
      </div>
      <div
        className="fixed top-[50%] right-4 cursor-pointer z-[1000]"
        onClick={() => {
          scrollNext();
        }}
      >
        <GrNext size={40} color={"white"} />
      </div>
      <div className="lg:bg-black lg:bg-opacity-50 fixed bottom-8 lg:bottom-4 left-[50%] -translate-x-1/2 z-[1000] py-1 px-2 rounded-lg w-[80px] text-center text-white">
        {currentImageIndex !== null && currentImageIndex + 1} /{" "}
        {imagePaths.length}
      </div>
      <div className="embla w-full h-screen" ref={emblaRef}>
        <div className="embla__container w-full">
          {imagePaths.map((item, index) => (
            <div
              key={index}
              className="embla__slide h-screen flex items-center justify-center"
            >
              <img
                src={`${config.uploadPrefix}/${item}`}
                alt={item}
                className="max-h-[50vh] lg:max-h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ImageWindow;
