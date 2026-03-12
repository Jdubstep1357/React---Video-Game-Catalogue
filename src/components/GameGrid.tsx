import { SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { GameQuery } from "../App";
import useGames from "../hooks/useGames";
import GameCard from "./GameCard";
import GameCardContainer from "./GameCardContainer";
import GameCardSkeleton from "./GameCardSkeleton";
// LOOK AT USEGAMES.TS HOOK

interface Props {
  gameQuery: GameQuery;
}

const GameGrid = ({ gameQuery }: Props) => {
  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useGames(gameQuery);
  const skeletons = [1, 2, 3, 4, 5, 6];

  if (error) return <Text>{error.message}</Text>;

  {
    /* Computing / shsowing how many games one has made so far */
  }
  const fetchedGamesCount =
    data?.pages.reduce(
      (total, page) => total + page.results.length,
      0,
      // ensures number is type of number that is not undefined or number
    ) || 0;

  return (
    <>
      <InfiniteScroll
        dataLength={fetchedGamesCount}
        hasMore={!!hasNextPage}
        next={() => fetchNextPage()}
        loader={<Spinner />}
      >
        <SimpleGrid
          padding="10px"
          columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
          spacing={6}
        >
          {isLoading &&
            skeletons.map((skeleton) => {
              return (
                // Ensures load only button
                <GameCardContainer key={skeleton}>
                  <GameCardSkeleton />
                </GameCardContainer>
              );
            })}

          {/* 
          1. Map each page to a React Fragment
          2. Map each game to each gamecard container
        */}
          {data?.pages.map((page, index) => (
            // Mapping each page to a fragment
            <React.Fragment key={index}>
              {page.results.map((game) => (
                <GameCardContainer key={game.id}>
                  <GameCard game={game} />
                </GameCardContainer>
              ))}
            </React.Fragment>
          ))}
        </SimpleGrid>
      </InfiniteScroll>
    </>
  );
};

export default GameGrid;
