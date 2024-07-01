import { motion } from "framer-motion";
import React from "react";

import { InfoType } from "@/types/InfoType";

interface Props {
  info: InfoType;
}

const Toast: React.FC<Props> = ({ info }) => {
  return (
    <motion.div
      initial={{ opacity: 0, transform: "translateX(0)" }}
      animate={{ opacity: 1, transform: "translateX(-30px)" }}
      exit={{ opacity: 0, transform: "translateX(0)" }}
      className="fixed top-[100px] right-[40px] transform -translate-x-1/2 z-[1000]"
    >
      <div
        role="alert"
        className={`alert ${info.type === "success" ? "alert-success" : info.type === "error" ? "alert-error" : "alert-info"}`}
      >
        {info.type === "success" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {info.type === "error" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        {info.type === "info" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        )}

        <span>{info.message}</span>
      </div>
    </motion.div>
  );
};

export default Toast;
