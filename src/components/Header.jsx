import UseUser from "../hooks/UseUser";
import { Logo } from "../assets";
import { AnimatePresence, motion } from "framer-motion";
import { PuffLoader } from "react-spinners";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiLogout } from "react-icons/hi";
import { auth } from "../config/firebase.config";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { AdminIds } from "../utils/helper";
import useFilters from "../hooks/useFilters";

const Header = () => {
  const { data: filterData } = useFilters();
  const [menu, setmenu] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { data, isLoading, isError } = UseUser();
  const QueryClient = useQueryClient();

  const SignoutUser = async () => {
    await auth.signOut().then(() => {
      QueryClient.setQueryData("user", null);
      toast.success("User signed out successfully");
    });
  };

  const handleserchterm = (e) => {
    const prevstate = QueryClient.getQueryData("globalfilter");
    const updatedstate = { ...prevstate, serchitem: e.target.value };
    QueryClient.setQueryData("globalfilter", updatedstate);
  };

  const clearfilter = () => {
    const prevstate = QueryClient.getQueryData("globalfilter");
    const updatedstate = { ...prevstate, serchitem: "" };
    QueryClient.setQueryData("globalfilter", updatedstate);
  };
  return (
    <header className="w-full flex items-center justify-between px-4 py-3 lg:px-8 border-b border-gray-300 z-50 gap-12 sticky top-0">
      <Link to="/">
        <img src={Logo} className="w-8 h-auto object-contain" alt="" />
      </Link>
      <div className="flex-1 border-gray-300 px-4 py-1 rounded-md items-center justify-between bg-gray-200">
        <input
          onChange={handleserchterm}
          type="text"
          value={filterData?.serchitem}
          placeholder="search here..."
          className="flex-1 h-10 bg-transparent text-base font-semibold outline-none border-none"
        />
        <AnimatePresence>
          {filterData?.serchitem.length > 0 && (
            <motion.div
              onClick={clearfilter}
              className="w-4 h-4 flex items-center justify-center  bg-gray-300 rounded-md cursor-pointer active:scale-95 duration-150"
            >
              <p className="text-2xl text-black">x</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isLoading ? (
          <PuffLoader color="#498FCD" size={40} />
        ) : (
          <React.Fragment>
            {data ? (
              <motion.div className="relative" onClick={() => setmenu(!menu)}>
                {data.photoURL ? (
                  <div className="w-12 h-12 rounded-md relative flex items-center justify-center cursor-pointer">
                    <img
                      src={data.photoURL}
                      className="w-full h-full object-cover rounded-md"
                      alt=""
                    />
                  </div>
                ) : (
                  <div className="w-12 h-212 rounded-md relative flex items-center justify-center bg-blue-700 shadow-md">
                    <p className="text-lg text-white cursor-pointer">
                      {data.email[0]}
                    </p>
                  </div>
                )}
                {/* drawer */}
                <AnimatePresence>
                  {menu && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute px-4 py-3 rounded-md bg-white right-0 top-10 flex-col justify-start items-center gap-3 w-64 pt-16"
                      onMouseLeave={() => setmenu(false)}
                    >
                      {data.photoURL ? (
                        <div className="w-20 h-20 rounded-full relative flex items-center flex-col justify-start cursor-pointer">
                          <img
                            src={data.photoURL}
                            className="w-full h-full object-cover rounded-full"
                            alt=""
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-20 rounded-full relative flex items-center justify-center bg-blue-700 shadow-md">
                          <p className="text-lg text-white cursor-pointer">
                            {data.email[0]}
                          </p>
                        </div>
                      )}
                      <p className="text-lg text-black cursor-pointer">
                        {data.displayName}
                      </p>
                      {/* menu option */}
                      <div className="w-full flex gap-8 pt-6 flex-col items-start">
                        <Link
                          to={"profile"}
                          className="text-gray-400 hover:text-black"
                        >
                          {" "}
                          My Account
                        </Link>
                        {AdminIds.includes(data.uid) && (
                          <Link
                            to={"/template/create"}
                            className="text-gray-400 hover:text-black"
                          >
                            {" "}
                            Add New Template{" "}
                          </Link>
                        )}
                        <div
                          onClick={SignoutUser}
                          className="w-full px-2 py-2 border-t border-gray-300 flex items-center justify-between group cursor-pointer"
                        >
                          <p className="group-hover:text-black">Sign Out</p>
                          <HiLogout className="group-hover:text-black" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ) : (
              <Link to={"/auth"}>
                <motion.button
                  className="px-4 py-2 rounded-md border-gray-300 bg-gray-200 hover:shadow-md active:scale-95 duration-150"
                  type="button"
                >
                  Login
                </motion.button>
              </Link>
            )}
          </React.Fragment>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
