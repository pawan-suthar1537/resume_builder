import React, { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { AdminIds, initialTags } from "../utils/helper";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";
import UseUser from "../hooks/UseUser";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db, storage } from "../config/firebase.config";
import { FaTrash } from "react-icons/fa6";
import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import useFetchTemplates from "../hooks/UseFetchTemplate";
import { useNavigate } from "react-router-dom";

const CreateTemplate = () => {
  const [formdata, setformdata] = useState({
    title: "",
    img: null,
  });

  const [tags, settags] = useState([]);
  const {
    data: templates,
    isError: templateisError,
    isLoading: templateisLoading,
    refetch: templateRefetch,
  } = useFetchTemplates();

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

  const handleselectedtags = (tag) => {
    if (tags.includes(tag)) {
      if (tags.includes(tag)) {
        const newtags = tags.filter((t) => t !== tag);
        settags(newtags);
      }
    } else {
      settags([...tags, tag]);
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

  const handleDeleteTemplate = async (template) => {
    const deletedref = ref(storage, template?.img); // Ensure this is the correct path to the image
    await deleteObject(deletedref)
      .then(async () => {
        await deleteDoc(doc(db, "templates", template?._id))
          .then(() => {
            toast.success("Template Deleted Successfully");
            templateRefetch();
          })
          .catch((error) => {
            console.error("Error deleting template:", error);
            toast.error("Failed to delete template");
          });
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
        toast.error("Failed to delete image");
      });
  };

  const navigate = useNavigate();

  const pushtoCloud = async () => {
    const timestamp = serverTimestamp();
    const id = `${Date.now()}`;
    const _doc = {
      _id: id,
      title: formdata.title,
      img: imageasset.image,
      tags: tags,
      name:
        templates && templates.length > 0
          ? `template${templates.length + 1}`
          : "Template1",
      timestamp: timestamp,
    };
    await setDoc(doc(db, "templates", id), _doc)
      .then(() => {
        setformdata((prevRec) => ({ ...prevRec, title: "", img: null }));
        setimageasset((prevRec) => ({ ...prevRec, image: null }));
        settags([]);
        templateRefetch();
        toast.success("Template Added Successfully");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        toast.error("Failed to add template");
      });
  };

  const { data: user, isLoading } = UseUser();

  useEffect(() => {
    if (!isLoading && !AdminIds.includes(user?.uid)) {
      navigate("/", { replace: true });
    }
  }, [user, isLoading]);
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
          <p className="text-sm text-gray-800  font-bold capitalize">
            {templates && templates.length > 0
              ? `template${templates.length + 1}`
              : "Template1"}
          </p>
        </div>
        {/* template title */}
        <input
          type="text"
          name="title"
          id=""
          placeholder="Template Title"
          value={formdata.title}
          onChange={handleInputChange}
          className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-300 text-lg text-gray-800  focus:shadow-md outline-none"
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
        {/*  tags section */}
        <div className="w-full flex items-center flex-wrap gap-2">
          {initialTags.map((tag, i) => (
            <div
              key={i}
              className={`border border-gray-200 px-2 py-1 rounded-md cursor-pointer ${
                tags.includes(tag) ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleselectedtags(tag)}
            >
              <p className="text-xs">{tag}</p>
            </div>
          ))}
        </div>
        {/* button */}
        <button
          type="button"
          className="w-full bg-blue-700 text-white rounded-md py-3"
          onClick={pushtoCloud}
        >
          Save
        </button>
      </div>

      {/* right container */}
      <div className="col-span-12 lg:col-span-8 2xl:col-span-9 px-2 w-full flex-1 py-4 ">
        {templateisLoading ? (
          <React.Fragment>
            <div className="w-full f-full flex items-center justify-center">
              <PuffLoader color="#498FCD" size={40} />
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {templates && templates.length > 0 ? (
              <React.Fragment>
                <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-2">
                  {templates.map((temp) => (
                    <div
                      key={temp._id}
                      className="w-full h-[400px] rounded-md overflow-hidden relative"
                    >
                      <img
                        src={temp?.img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute top-3 right-3 w-8 h-8 rounded-md items-center flex justify-center bg-red-500 cursor-pointer"
                        onClick={() => handleDeleteTemplate(temp)}
                      >
                        <FaTrash className="text-sm text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className="w-full h-full flex flex-col gap-6 items-center justify-center">
                  <PuffLoader color="#498FCD" size={40} />
                  <p className="text-center">No data</p>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default CreateTemplate;
