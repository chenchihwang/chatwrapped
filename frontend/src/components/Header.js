import React from "react";
import { Link, useLocation } from "react-router-dom";
import Countdown from "./Countdown";

const Header = ({ isHome }) => {
  const location = useLocation();
  const targetDate = new Date("November 4, 2023 23:59:59");

  return (
    <div className={`${isHome ? "" : "backdrop-blur-sm"}`}>
      <div className="fixed top-5 left-7 sm:left-5 flex flex-col z-50">
        <Link className="font-bold text-gray-200 opacity-85" to="/">
          tartanspace
        </Link>
        <Countdown targetDate={targetDate} />
      </div>

      <div className="fixed top-5 right-5 sm:right-3 flex-row gap-20 text-gray-200 opacity-100 z-50">
        <Link
          className={`font-bold p-2 text-white ${
            location.pathname === "/about" ? "underline" : ""
          }`}
          to="/about"
        >
          About
        </Link>
        <Link
          className={`font-bold p-2 px-3 text-white ${
            location.pathname === "/form" ? "underline" : ""
          }`}
          to="/form"
        >
          Upload
        </Link>
      </div>
    </div>
  );
};

export default Header;
