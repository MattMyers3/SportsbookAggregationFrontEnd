import { GameLines } from "common/models/GameLines";
import { apiUrl } from "common/variables/constants";

export default class GameLinesService {
  static async getLines(
    gameId: string,
    checkedBooks: string[]
  ): Promise<GameLines> {
    var data = await this.getResponse(gameId, checkedBooks);
    return data;
  }
  private static async getResponse(
    gameId: string,
    checkedBooks: string[]
  ): Promise<any> {
    var response = await fetch(
      apiUrl +
        "/GameLines/best/" +
        gameId +
        "?sportsbooks=" +
        checkedBooks.join()
    );
    if (response.status != 200) {
      throw "Could Not Fetch Game Lines";
    }
    return response.json();
  }
}
