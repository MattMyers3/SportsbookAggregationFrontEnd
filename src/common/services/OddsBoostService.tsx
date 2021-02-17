import { OddsBoost } from "common/models/OddsBoost";
import { apiUrl } from "common/variables/constants";

export default class OddsBoostService {
  static async getOddsBoosts(): Promise<OddsBoost[]> {
    var data = await this.getResponse();
    return data;
  }
  private static async getResponse(): Promise<any> {
    var response = await fetch(apiUrl + "/oddsboosts");
    if (response.status >= 400) {
      throw "Could Not Fetch Game";
    }
    return response.json();
  }
}
