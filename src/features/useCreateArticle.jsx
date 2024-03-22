import { axiosInstance } from "@/lib/axios";
import { useMutation } from "react-query";

export const useCreateArticle = ({ onSuccess }) => {
    return useMutation({
        mutationFn: async (body) => {
          const response = await axiosInstance.post("/myarticles/create", body);
          return response;
        },
        onSuccess,
    });

}