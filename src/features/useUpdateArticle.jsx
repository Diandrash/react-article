import { axiosInstance } from "@/lib/axios";
import { useMutation } from "react-query";

export const useUpdateArticle = ( {onSuccess} ) => {
    return useMutation({
        mutationFn: async (body) => {
          const response = await axiosInstance.put(
            `/myarticles/${body.id}/edit`,
            body
          );
        },
        onSuccess
      });
}