import { useQuery } from "@tanstack/react-query";

import api from "../configs/api";

export function useGetAllProducts(page, search) {
  return useQuery({
    queryKey: ["products", page, search],
    queryFn: async () => {
      const searchNumberMatch = search.match(/\d+/);
      const extractedNumber = searchNumberMatch
        ? Number(searchNumberMatch)
        : null;
      const response = await api.get(
        `/products?page${page}&limit=10&name=${search}`
      );
      return { data: response.data, searchTerm: search, extractedNumber };
    },
  });
}
