import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import Link from "next/link";
import useResponsiveMediaQuery from "@/hooks/useResponsiveMediaQuery";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [debouncedActiveDropdown, setDebouncedActiveDropdown] = useState<
    string | null
  >(null);

  const isDesktopOrLaptop = useResponsiveMediaQuery(
    "(min-width: 1024px)",
    true,
  );

  useEffect(() => {
    if (activeDropdown !== null) {
      setDebouncedActiveDropdown(activeDropdown);
      return;
    }
    const handler = setTimeout(() => {
      setDebouncedActiveDropdown(activeDropdown);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [activeDropdown]);

  const handleMouseEnter = (dropdown: string | null) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

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
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("talent")}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="flex items-center gap-2 cursor-pointer hover:text-gray-500 duration-200">
            Talent
            <FaChevronDown size={12} />
          </h1>
          <AnimatePresence>
            {debouncedActiveDropdown === "talent" && (
              <motion.div
                className="absolute top-[32px] left-0 mt-2 w-40 text-white bg-nav-dropdown p-2 shadow-lg z-[999] overflow-hidden"
                onMouseEnter={() => handleMouseEnter("talent")}
                onMouseLeave={handleMouseLeave}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="flex flex-col gap-5 py-[8px] px-[5px]">
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage1">All Talent</Link>
                  </li>
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage2">Women</Link>
                  </li>
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage3">Men</Link>
                  </li>
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage3">Children & Teens</Link>
                  </li>
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage3">Couples</Link>
                  </li>
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage3">Families</Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("forClients")}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="flex items-center gap-2 cursor-pointer hover:text-gray-500 duration-200">
            For Clients
            <FaChevronDown size={12} />
          </h1>
          <AnimatePresence>
            {debouncedActiveDropdown === "forClients" && (
              <motion.div
                className="absolute top-[32px] left-0 mt-2 w-40 text-white bg-nav-dropdown p-2 shadow-lg z-[999] overflow-hidden"
                onMouseEnter={() => handleMouseEnter("forClients")}
                onMouseLeave={handleMouseLeave}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="flex flex-col gap-5 py-[8px] px-[5px]">
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forClients/subpage1">Booking Terms</Link>
                  </li>
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forClients/subpage2">Request Talent</Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div
          className="relative"
          onMouseEnter={() => handleMouseEnter("forTalents")}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="flex items-center gap-2 cursor-pointer hover:text-gray-500 duration-200">
            For Talents
            <FaChevronDown size={12} />
          </h1>
          <AnimatePresence>
            {debouncedActiveDropdown === "forTalents" && (
              <motion.div
                className="absolute top-[32px] left-0 mt-2 w-40 text-white bg-nav-dropdown p-2 shadow-lg z-[999] overflow-hidden"
                onMouseEnter={() => handleMouseEnter("forTalents")}
                onMouseLeave={handleMouseLeave}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ul className="flex flex-col gap-5 py-[8px] px-[5px]">
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage1">How To Join</Link>
                  </li>
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage2">FAQ</Link>
                  </li>
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage3">Registration Form</Link>
                  </li>
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage3">
                      Registration Process
                    </Link>
                  </li>
                  <li className="hover:text-gray-500 duration-200">
                    <Link href="/forTalents/subpage3">Make A Payment</Link>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <h1 className="flex items-center gap-2 cursor-pointer hover:text-gray-500 duration-200">
          News
        </h1>
        <h1 className="flex items-center gap-2 cursor-pointer hover:text-gray-500 duration-200">
          About
        </h1>
        <h1 className="flex items-center gap-2 cursor-pointer hover:text-gray-500 duration-200">
          Contact
        </h1>
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
