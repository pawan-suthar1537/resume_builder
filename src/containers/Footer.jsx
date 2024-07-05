import { Link } from "react-router-dom";
import { Logo } from "../assets";

const Footer = () => {
  return (
    <div className="w-full flex items-center justify-between border-t border-t-gray-700">
      <div className="flex items-center justify-center gap-3 py-3">
        <img src={Logo} className="w-8 h-auto object-contain" alt="" />
        <p>Resume</p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Link to={"/"} className="text-blue-700 text-sm">
          Home
        </Link>
        <Link to={"/"} className="text-blue-700 text-sm">
          Contact
        </Link>
        <Link to={"/"} className="text-blue-700 text-sm whitespace-nowrap">
          Privacy Policiy
        </Link>
      </div>
    </div>
  );
};

export default Footer;
