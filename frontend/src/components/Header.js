import React from "react";
import { Link } from "react-router-dom";
import Countdown from "./Countdown";

const Header = ({ isHome }) => {
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
          className="font-bold p-2 mx-1 border border-gray-300 bg-transparent"
          to="/about"
        >
          about
        </Link>
        <Link
          className="font-bold p-2 px-3 mx-1 border border-gray-300 bg-gray-200 text-gray-900"
          to="/form"
        >
          join
        </Link>
      </div>
    </div>
  );
};

export default Header;
