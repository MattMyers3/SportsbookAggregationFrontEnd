import { Book } from "common/models/Book";
import { GameLines } from "common/models/GameLines";
import { GameProp } from "common/models/GameProp";
import { apiUrl } from "common/variables/constants";

export default class GamePropsService {
  static async getProps(
    gameId: string,
    checkedBooks: Book[]
  ): Promise<GameProp[]> {
    var data = await this.getResponse(gameId, checkedBooks);
    return data;
  }
  private static async getResponse(
    gameId: string,
    checkedBooks: Book[]
  ): Promise<any> {
    var response = await fetch(
      apiUrl +
        "/games/" +
        gameId +
        "/bestprops?sportsbooks=" +
        checkedBooks.map((book) => book.value).join()
    );
    if (response.status >= 400) {
      throw "Could Not Fetch Game";
    }
    return response.json();
  }
}
