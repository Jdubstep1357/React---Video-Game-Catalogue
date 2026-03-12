import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { GameQuery } from "../App";
import APIClient, {FetchResponse } from "../services/api-client";
import { Platform } from "./usePlatforms";

const apiClient = new APIClient<Game>('/games');


export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const useGames = (gameQuery: GameQuery) =>

  useInfiniteQuery<FetchResponse<Game>, Error>({
    // anytime these values change react query update backend
    queryKey: ['games', gameQuery],
    queryFn: ({ pageParam = 1}) => 
      apiClient
        .getAll({
              params: {
        genres: gameQuery.genre?.id,
        parent_platforms: gameQuery.platform?.id,
        ordering: gameQuery.sortOrder,
        search: gameQuery.searchText,
        page: pageParam
      },
    }),

    getNextPageParam: (lastPage, allPages) => {
      return allPages.length ? allPages.length + 1 : undefined;
    },
    staleTime: 24 * 60 * 60 * 1000 // 24 hours
  })


export default useGames;
