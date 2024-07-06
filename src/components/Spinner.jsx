import { PuffLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="w-screen h-screen items-center justify-center flex ">
      <PuffLoader color="#498FCD" size={80} />
    </div>
  );
};

export default Spinner;
