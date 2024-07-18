import { Filters } from "../components";

const Homecontainer = () => {
  return (
    <div className="w-full px-4 lg:px-12 py-6 flex flex-col items-center justify-start">
      {/* filter */}
      <Filters />

      {/* render template from databse */}
    </div>
  );
};

export default Homecontainer;
