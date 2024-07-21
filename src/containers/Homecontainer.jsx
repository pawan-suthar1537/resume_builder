import React from "react";
import { Filters, Spinner, TemplateDesignpin } from "../components";
import useFetchTemplates from "../hooks/UseFetchTemplate";
import { AnimatePresence } from "framer-motion";

const Homecontainer = () => {
  const {
    data: templates,
    isError: templateserror,
    isLoading: templatesloading,
    // eslint-disable-next-line no-unused-vars
    refetch: templatesrefetch,
  } = useFetchTemplates();

  if (templatesloading) {
    <Spinner />;
  }
  return (
    <div className="w-full px-4 lg:px-12 py-6 flex flex-col items-center justify-start">
      {/* filter */}
      <Filters />

      {/* render template from databse */}
      {templateserror ? (
        <React.Fragment className="text-lg text-gray-600">
          <p>Something Went Wrong...</p>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2">
            <RenderATemplate templates={templates} />
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

const RenderATemplate = ({ templates }) => {
  return (
    <>
      {templates && templates.length > 0 ? (
        <>
          <AnimatePresence>
            {templates &&
              templates.map((template, index) => (
                <TemplateDesignpin
                  key={template._id}
                  data={template}
                  index={index}
                />
              ))}
          </AnimatePresence>
        </>
      ) : (
        <>
          <p>no data</p>
        </>
      )}
    </>
  );
};

export default Homecontainer;
