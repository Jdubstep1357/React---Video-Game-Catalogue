import { useQuery } from "@tanstack/react-query";
import genres from "../data/genres";
import apiClient from "../services/api-client";
import { FetchResponse } from "./useData";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

const useGenres = () => useQuery({
  queryKey: ['genres'],
  queryFn: () => apiClient
    .get<FetchResponse<Genre>>('/genres')
    .then((res) => res.data),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours in total
    // NO SPINNER DUE TO DATA BEING SENT TO CACHE - will reset in 24 hours and spinner will be displayed once
    initialData: { count: genres.length, results: genres }
})

export default useGenres;