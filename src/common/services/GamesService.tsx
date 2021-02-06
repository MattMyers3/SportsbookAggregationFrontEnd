import { Game } from "common/models/Game";
import { Team } from "common/models/Team";
import { apiUrl } from "common/variables/constants";

export default class GamesService {
  static async getGameById(id: string): Promise<Game> {
    let data = await this.getResponseById(id);
    return data;
  }

  static async getGamesByDateRange(
    startDate: Date,
    endDate: Date,
    sport: string
  ): Promise<Game[]> {
    let data = await this.getResponseByDateRange(startDate, endDate, sport);
    return data;
  }

  private static async getResponseById(id: string) {
    let response = await fetch(apiUrl + "/games/" + id);
    if (response.status >= 400) {
      throw "Could Not Fetch Games";
    }
    return response.json();
  }

  private static async getResponseByDateRange(
    startDate: Date,
    endDate: Date,
    sport: string
  ) {
    let response = await fetch(
      apiUrl +
        "/games?start=" +
        startDate.toISOString() +
        "&end=" +
        endDate.toISOString() +
        "&sport=" +
        sport
    );

    if (response.status >= 400) {
      throw "Could Not Fetch Games";
    }
    return response.json();
  }
}
