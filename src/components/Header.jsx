import UseUser from "../hooks/UseUser";
import { Logo } from "../assets";
import { AnimatePresence, motion } from "framer-motion";
import { PuffLoader } from "react-spinners";
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const { data, isLoading, isError } = UseUser();
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px-8 border-b border-gray-300 z-50 gap-12 sticky top-0">
      <img src={Logo} className="w-8 h-auto object-contain" alt="" />
      <div className="flex-1 border-gray-300 px-4 py-1 rounded-md items-center justify-between bg-gray-200">
        <input
          type="text"
          placeholder="search here..."
          className="flex-1 h-10 bg-transparent text-base font-semibold outline-none border-none"
        />
      </div>
      <AnimatePresence>
        {isLoading ? (
          <PuffLoader color="#498FCD" size={40} />
        ) : (
          <React.Fragment>
            {data ? (
              <motion.div className="relative">
                {data.photoURL ? (
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center cursor-pointer">
                    <img
                      src={data.photoURL}
                      className="w-full h-full object-cover rounded-md"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center bg-blue-700 shadow-md">
                    <p className="text-lg text-white cursor-pointer">
                      {data.email[0]}
                    </p>
                  </div>
                )}
                {/* drawer */}
                <AnimatePresence>
                  <motion.div className="absolute px-4 py-3 rounded-md bg-white right-0 top-10 flex-col justify-start items-center gap-3 w-64 pt-16"></motion.div>
                </AnimatePresence>
              </motion.div>
            ) : (
              <Link to={"/auth"}>
                <motion.button>Login</motion.button>
              </Link>
            )}
          </React.Fragment>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
