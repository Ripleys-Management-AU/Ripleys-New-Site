import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="bg-black flex flex-col justify-center items-center pt-2 pb-4 w-full">
      <Image
        src="images/logo-with-text.svg"
        alt="logo"
        height={90}
        width={90}
        className="cursor-pointer"
        onClick={() => {
          router.push("/");
        }}
      />
      <div className="flex flex-col lg:flex-row justify-center gap-20 pt-2 font-white lg:w-4/5">
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
    </div>
  );
};

export default Navbar;
