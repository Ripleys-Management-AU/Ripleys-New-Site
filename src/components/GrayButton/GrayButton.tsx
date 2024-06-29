import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const GrayButton: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <button
      className={`bg-button-bg rounded-lg p-2 cursor-pointer hover:bg-button-bg-hover duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default GrayButton;
