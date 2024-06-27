import Image from "next/image";
import { useMediaQuery } from "react-responsive";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/router";
import { useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const router = useRouter();

  return (
    <div className="fixed bg-black flex flex-row lg:flex-col justify-between lg:justify-center items-center pt-2 px-8 lg:px-0 pb-2 lg:pb-4 w-full lg:text-white top-0 z-[998]">
      <Image
        src="images/logo-with-text.svg"
        alt="logo"
        height={isDesktopOrLaptop ? 80 : 55}
        width={isDesktopOrLaptop ? 80 : 55}
        className="cursor-pointer relative z-[999]"
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="hidden lg:flex flex-col lg:flex-row justify-center gap-20 pt-2 lg:w-4/5">
        <h1 className="flex items-center gap-2 cursor-pointer">
          Talent
          <FaChevronDown size={12} />
        </h1>
        <h1 className="flex items-center gap-2 cursor-pointer">
          For Clients
          <FaChevronDown size={12} />
        </h1>
        <h1 className="flex items-center gap-2 cursor-pointer">
          For Talents
          <FaChevronDown size={12} />
        </h1>
        <h1 className="flex items-center gap-2 cursor-pointer">News</h1>
        <h1 className="flex items-center gap-2 cursor-pointer">About</h1>
        <h1 className="flex items-center gap-2 cursor-pointer">Contact</h1>
      </div>

      <div className="block lg:hidden relative z-[999]">
        <HamburgerMenu
          isOpen={isMobileMenuOpen}
          menuClicked={() => {
            setIsMobileMenuOpen((prevState) => !prevState);
          }}
          width={23}
          height={18}
          strokeWidth={2}
          rotate={0}
          color={isMobileMenuOpen ? "black" : "white"}
          borderRadius={0}
          animationDuration={0.5}
        />
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden w-screen left-0 items-start h-screen flex flex-col fixed px-6 pt-20 bg-white bg-opacity-70 mobile-blur z-[60] pointer will-change-opacity overflow-scroll top-0">
          <ul className="text-xl w-full uppercase font-bold text-cyan-800">
            <li>
              <Link
                className="py-2.5 w-full items-center block relative flex border-b border-cyan-500"
                href="/Talent"
              >
                Talent
              </Link>
            </li>
            <li>
              <Link
                className="py-2.5 w-full items-center block relative flex border-b border-cyan-500"
                href="/forClients"
              >
                For Clients
              </Link>
            </li>
            <li>
              <Link
                className="py-2.5 w-full items-center block relative flex border-b border-cyan-500"
                href="/forTalent"
              >
                For Talent
              </Link>
            </li>
            <li>
              <Link
                className="py-2.5 w-full items-center block relative flex border-b border-cyan-500"
                href="/news"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                className="py-2.5 w-full items-center block relative flex border-b border-cyan-500"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="py-2.5 w-full items-center block relative flex border-b border-cyan-500"
                href="/contact"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
