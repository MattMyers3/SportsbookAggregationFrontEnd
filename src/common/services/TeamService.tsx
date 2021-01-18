import { Team } from "common/models/Team";
import { apiUrl } from "common/variables/constants";

export default class TeamService {
  static async getTeam(teamId: string): Promise<Team> {
    var data = await this.getResponse(teamId);
    return data;
  }
  private static async getResponse(teamId: string) {
    var response = await fetch(apiUrl + "/teams/" + teamId);
    if (response.status >= 400) {
      throw "Could Not Fetch Team";
    }
    return response.json();
  }
}
