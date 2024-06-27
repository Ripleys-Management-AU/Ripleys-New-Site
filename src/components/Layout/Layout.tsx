import Navbar from "@/components/Navbar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-black">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
