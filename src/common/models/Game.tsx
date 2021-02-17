import { Sport } from "./Sport";

export type Game = {
  awayTeamId: string;
  gameId: string;
  homeTeamId: string;
  sport: Sport;
  sportId: string;
  timeStamp: string;
};
