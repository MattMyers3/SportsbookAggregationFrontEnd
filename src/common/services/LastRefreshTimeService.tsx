import { apiUrl } from "common/variables/constants";

export default class LastRefreshTimeService {
  static async getRefreshTime(category: string): Promise<Date> {
    var data = await this.getResponse(category);
    return new Date(data.lastRefreshTime);
  }
  private static async getResponse(category: string) {
    let response = await fetch(apiUrl + "/" + category + "/LastRefreshTime");

    if (response.status >= 400) {
      throw "Could Not Fetch Last Refresh Time";
    }
    return response.json();
  }
}
