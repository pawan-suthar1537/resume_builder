import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { FaTrash } from "react-icons/fa6";

const CreateTemplate = () => {
  const [formdata, setformdata] = useState({
    title: "",
    img: null,
  });

  const [imageasset, setimageasset] = useState({
    isimageloading: false,
    image: null,
    progress: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformdata((prevRec) => ({ ...prevRec, [name]: value }));
  };

  const handlefileselect = (e) => {
    setimageasset((prevRec) => ({ ...prevRec, isimageloading: true }));
    let file = e.target.files[0];
    if (file && isallowed(file)) {
      const storageref = ref(storage, `Templates/${Date.now()}-${file.name}`);
      // Add your logic here for handling the allowed file
      const upload = uploadBytesResumable(storageref, file);
      upload.on(
        "state_changed",
        (snapshot) => {
          setimageasset((prevRec) => ({
            ...prevRec,
            progress: Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            ),
          }));
        },
        (error) => toast.error(`Error : ${error.message}`),
        () => {
          getDownloadURL(upload.snapshot.ref).then((url) => {
            setimageasset((prevRec) => ({
              ...prevRec,
              image: url,
            }));
          });
          toast.success("Image Uploaded Successfully");
          setInterval(() => {
            setimageasset((prevRec) => ({ ...prevRec, isimageloading: false }));
          }, 2000);
        }
      );
    } else {
      toast.info("Please select a valid image file");
      setimageasset((prevRec) => ({ ...prevRec, isimageloading: false }));
    }
  };

  const handleDeleteImage = () => {
    const deletedref = ref(storage, imageasset.image);
    deleteObject(deletedref)
      .then(() => {
        setimageasset((prevRec) => ({
          ...prevRec,
          progress: 0,
          image: null,
        }));
        toast.success("Image Deleted Successfully");
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
        toast.error("Failed to delete image");
      });
  };

  const isallowed = (file) => {
    const allowed = ["image/png", "image/jpeg", "image/jpg"];
    return allowed.includes(file.type);
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
        {/* file uploader */}
        <div className="w-full bg-gray-100 backdrop-blur-md h-[420px] lg:h-[320px] 2xl:h-[340px] rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center">
          {imageasset.isimageloading ? (
            <React.Fragment>
              <div className="flex flex-col items-center justify-center gap-4">
                <PuffLoader color="#498FCD" size={40} />
                <p>{imageasset?.progress.toFixed(2)}%</p>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {!imageasset.image ? (
                <React.Fragment>
                  <label className="w-full cursor-pointer h-full">
                    <div className="flex flex-col items-center justify-center h-full s-full">
                      <div className=" flex items-center gap-4 justify-center cursor-pointer flex-col">
                        <FaUpload className="text-2xl" />
                        <p>Click to Upload</p>
                      </div>
                    </div>
                    <input
                      type="file"
                      name=""
                      id=""
                      className="w-0 h-0 "
                      accept=".jpg,.jpeg,.png"
                      onChange={handlefileselect}
                    />
                  </label>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="relative h-full w-full overflow-hidden rounded-md">
                    <img
                      src={imageasset.image}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* delete image action */}
                    <div
                      className="absolute top-3 right-3 w-8 h-8 rounded-md items-center flex justify-center bg-red-500 cursor-pointer"
                      onClick={handleDeleteImage}
                    >
                      <FaTrash className="text-sm text-white" />
                    </div>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>

      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9">2</div>
    </div>
  );
};

export default CreateTemplate;
