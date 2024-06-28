import React from "react";

import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-black">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
