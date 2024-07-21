import { useState, useEffect } from "react";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import UseUser from "../hooks/UseUser";
import { SavetoCollection } from "../api";

const TemplateDesignpin = ({ data, index }) => {
  const { data: user, refetch: userRefetch } = UseUser();
  const [isInCollection, setIsInCollection] = useState(false);

  useEffect(() => {
    if (user?.collection?.includes(data?._id)) {
      setIsInCollection(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, data?.id]);

  // eslint-disable-next-line no-unused-vars
  const addtocollection = async (e) => {
    // e.stopPropagation();
    try {
      await SavetoCollection(user, data);
      userRefetch();
      setIsInCollection(true);
    } catch (err) {
      console.error("Error adding to collection", err);
    }
  };

  return (
    <motion.div
      // eslint-disable-next-line react/prop-types
      key={data?._id}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ delay: index * 0.3, ease: easeInOut }}
      className="w-full flex items-center justify-center flex-col gap-2 p-2"
    >
      <div className="w-full h-[500px] 2xl:h-[300px] rounded-md bg-gray-200 overflow-hidden relative">
        <img src={data?.img} className="w-full h-full object-cover" alt="" />
        <button
          className={`absolute top-4 right-4 bg-white rounded-full p-2 shadow-md z-50${
            isInCollection ? "text-red-500" : "text-gray-500"
          }`}
          onClick={addtocollection}
        >
          <FaHeart className="h-6 w-6" />
        </button>
        <AnimatePresence>
          <motion.div className="absolute inset-0 bg-[rgba(0,0,0,0.4)] flex flex-col items-center justify-start px-4 py-3 z-50 cursor-pointer"></motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TemplateDesignpin;
