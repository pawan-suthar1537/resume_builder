import { MdLayersClear } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FiltersData } from "../utils/helper";
import useFilters from "../hooks/useFilters";
import { useQueryClient } from "react-query";

const Filters = () => {
  const [ishover, setishover] = useState(false);
  const { data: filterData, isLoading, isError } = useFilters();
  const queryclient = useQueryClient();

  const handlefiltervaluechange = (value) => {
    const prevstate = queryclient.getQueryData("globalfilter");
    const updatedstate = { ...prevstate, serchitem: value };
    queryclient.setQueryData("globalfilter", updatedstate);
  };

  const clearfilter = () => {
    const prevstate = queryclient.getQueryData("globalfilter");
    const updatedstate = { ...prevstate, serchitem: "" };
    queryclient.setQueryData("globalfilter", updatedstate);
  };
  return (
    <div className="w-full flex items-center justify-start py-4">
      <div
        onMouseEnter={() => setishover(true)}
        onMouseLeave={() => setishover(false)}
        onClick={clearfilter}
        className="border border-gray-300 rounded-md px-3 py-2 mr-2 cursor-pointer group hover:shadow-md bg-gray-200 relative"
      >
        <MdLayersClear className="text-xl" />
        <AnimatePresence>
          {ishover && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 20 }}
              className="absolute -top-8 -left-2 bg-white shadow-md rounded-md px-2 py-1"
            >
              <p className=" whitespace-nowrap text-xs">Clear all</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full flex items-center justify-start overflow-x-scroll gap-6 scrollbar-none">
        {FiltersData &&
          FiltersData.map((filter, i) => (
            <div
              onClick={() => handlefiltervaluechange(filter.value)}
              key={i.id}
              className={`border border-gray-300 rounded-md px-6 py-2 cursor-pointer group hover:shadow-md ${
                filterData?.serchitem === filter.value &&
                "bg-gray-300 shadow-md"
              } `}
            >
              <p className="text-sm text-gray-500 group-hover:text-gray-600 whitespace-nowrap">
                {filter.label}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filters;
