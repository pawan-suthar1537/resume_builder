import React, { useState } from "react";

const CreateTemplate = () => {
  const [formdata, setformdata] = useState({
    title: "",
    img: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformdata((prevRec) => ({ ...prevRec, [name]: value }));
  };
  return (
    <div className="w-full px-4 lg:px-10 2xl:px-32 py-4 grid grid-cols-1 lg:grid-cols-12 ">
      {/* left container */}
      <div className="col-span-12 lg:col-span-4 2xl:col-span-3 w-full flex-1 flex items-center justify-start flex-col gap-4 px-2">
        <div className="w-full">
          <p className="text-lg text-gray-600">Create New Template</p>
        </div>
        {/* template id section */}
        <div className="w-full flex items-center justify-end">
          <p className="text-base text-gray-500 uppercase font-semibold">
            TEMPID :{" "}
          </p>
          <p className="text-sm text-gray-800  font-bold capitalize">one</p>
        </div>
        {/* template title */}
        <input
          type="text"
          name="title"
          id=""
          placeholder="Template Title"
          value={formdata.title}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-gray-800 focus: text-gray-950 focus:shadow-md outline-none"
        />
      </div>
      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">2</div>
    </div>
  );
};

export default CreateTemplate;
