import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { getuserdetails } from "../api";

const UseUser = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    "user",
    async () => {
      try {
        const userdetails = await getuserdetails();
        return userdetails;
      } catch (error) {
        if (!error.message.includes("not authenticated")) {
          toast.error("Something went wrong..");
        }
        throw error;
      }
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  return { data, isLoading, isError, refetch };
};

export default UseUser;
