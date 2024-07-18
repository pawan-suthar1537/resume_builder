import { useQuery } from "react-query";

const useFilters = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "globalfilter",
    () => ({ serchitem: "" }),
    { refetchOnWindowFocus: false }
  );
  return {
    data,
    isLoading,
    isError,
    refetch,
  };
};

export default useFilters;
