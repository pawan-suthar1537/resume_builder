/* eslint-disable react/prop-types */
import { FaChevronRight } from "react-icons/fa";
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

const Authbtnwithprovider = ({ Icon, label, provider }) => {
  const googleauth = new GoogleAuthProvider();
  const githubauth = new GithubAuthProvider();

  const handleclick = async () => {
    switch (provider) {
      case "GoogleAuthProvider":
        await signInWithRedirect(auth, googleauth)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.message);
          });
        break;
      case "GithubAuthProvider":
        await signInWithRedirect(auth, githubauth)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.message);
          });
        break;
      default:
        await signInWithRedirect(auth, googleauth)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.message);
          });
        break;
    }
  };
  return (
    <div
      onClick={handleclick}
      className="w-full px-4 py-3 rounded-md border-2 border-blue-700 flex items-center justify-between cursor-pointer group-hover:bg-blue-700 scale-95 duration-150 hover:shadow-md "
    >
      <Icon className="text-xl text-gray-700 group-hover:text-white" />
      <p className="text-lg text-gray-700 group-hover:text-white ml-2">
        {label}
      </p>
      <FaChevronRight className="text-gray-700 text-base group-hover:text-white ml-2" />
    </div>
  );
};

export default Authbtnwithprovider;
