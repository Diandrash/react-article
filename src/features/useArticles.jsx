import { useQuery } from "react-query";
import { axiosInstance } from "../lib/axios";

export const useArticles = () => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get("/articles");
      // console.log(response.data.data);
      return response.data.data
    },
  });

  return {
    data,
    isLoading,
    refetch,
  };
};
