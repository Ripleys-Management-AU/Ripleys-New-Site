import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

import styles from "./Animation.module.css";

const Stars = () => {
  const starRef = useRef(null);

  useEffect(() => {
    gsap.to(starRef.current, {
      duration: 1,
      opacity: 0,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className={styles.starsContainer}>
      <svg
        width="184"
        height="159"
        viewBox="0 0 184 159"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={starRef}
      >
        <path
          d="M121.096 6.01965L122.66 23.7451L137.133 34.0963L119.408 35.6599L109.057 50.1337L107.493 32.4082L93.0194 22.057L110.745 20.4934L121.096 6.01965Z"
          fill="white"
        />
        <path
          d="M-0.000105313 144.3L14.3001 130L28.6002 144.3L14.3001 158.6L-0.000105313 144.3Z"
          fill="white"
        />
        <path
          d="M25.7412 62.7412L28.4376 56L32.1453 62.7412L39.5605 67.797L33.1564 70.1564L30.797 76.8976L25.7412 69.1453L19 65.4376L25.7412 62.7412Z"
          fill="white"
        />
        {/*<ellipse*/}
        {/*  cx="179.045"*/}
        {/*  cy="28.3929"*/}
        {/*  rx="4.0447"*/}
        {/*  ry="5.39293"*/}
        {/*  fill="white"*/}
        {/*/>*/}
      </svg>
    </div>
  );
};

export default Stars;
