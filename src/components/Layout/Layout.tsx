import Navbar from "@/components/Navbar";
import React from "react";
import Footer from "@/components/footer/Footer";

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
