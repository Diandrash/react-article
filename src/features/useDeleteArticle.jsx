import { axiosInstance } from "@/lib/axios";
import { useMutation } from "react-query";

export const useDeleteArticle = ( {onSuccess} ) => {
    return useMutation({
        mutationFn: async (id) => {
          const response = await axiosInstance.delete(`/myarticles/${id}/delete`);
          return response;
        },
        onSuccess,
    });
};
