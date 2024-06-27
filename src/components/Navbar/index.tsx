import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="bg-black flex flex-col justify-center items-center pt-2 pb-4 w-full">
      <Image
        src="images/logo-with-text.svg"
        alt="logo"
        height={110}
        width={110}
      />
      <div className="flex flex-col lg:flex-row justify-center gap-20 pt-2 font-white lg:w-4/5">
        <h1 className="flex items-center gap-2">
          Talent
          <FaChevronDown size={12} />
        </h1>
        <h1 className="flex items-center gap-2">
          For Clients
          <FaChevronDown size={12} />
        </h1>
        <h1 className="flex items-center gap-2">
          For Talents
          <FaChevronDown size={12} />
        </h1>
        <h1 className="flex items-center gap-2">
          News
          <FaChevronDown size={12} />
        </h1>
        <h1 className="flex items-center gap-2">
          About
          <FaChevronDown size={12} />
        </h1>
        <h1 className="flex items-center gap-2">
          Contact
          <FaChevronDown size={12} />
        </h1>
      </div>
    </div>
  );
};

export default Navbar;
