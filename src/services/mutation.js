import api from "../configs/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);
  return useMutation({ mutationFn });
};
const useLogin = () => {
  const mutationFn = (data) => api.post("auth/login", data);
  return useMutation({ mutationFn });
};
const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.delete("products", data);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["all-products"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.post("products", data);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["all-products"] });
  };

  return useMutation({ mutationFn, onSuccess });
};

export { useRegister, useLogin, useCreateProduct, useDeleteProduct };
