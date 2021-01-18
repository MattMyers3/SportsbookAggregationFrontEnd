import React from "react";
import { apiUrl } from "common/variables/constants";
import GameLinesService from "common/services/GameLinesService";
import { GameLines } from "common/models/GameLines";
import TeamService from "common/services/TeamService";

interface GameRowProps {
  key: string;
  sport: string;
  homeTeamId: string;
  awayTeamId: string;
  gameId: string;
  checkedBooks: string[];
  gameTime: string;
}

interface GameRowState {
  gameLines: GameLines;
  homeTeamName: string;
  awayTeamName: string;
  isLoaded: boolean;
}

class GameRow extends React.Component<GameRowProps, GameRowState> {
  state = {
    gameLines: {} as GameLines,
    homeTeamName: "",
    awayTeamName: "",
    isLoaded: false,
  };
  render() {
    if (!this.state.isLoaded) {
      return <React.Fragment></React.Fragment>;
    }
    return (
      <React.Fragment>
        <tr>
          <th scope="row">{this.state.awayTeamName}</th>
          {this.getDisplayCell(
            this.state.gameLines.currentAwaySpread,
            this.state.gameLines.currentAwaySpreadPayout,
            this.state.gameLines.awaySpreadSite,
            null
          )}
          {this.getDisplayCell(
            this.state.gameLines.currentAwayMoneyLine,
            null,
            this.state.gameLines.awayMoneyLineSite,
            null
          )}
          {this.getDisplayCell(
            this.state.gameLines.currentOver,
            this.state.gameLines.currentOverPayout,
            this.state.gameLines.overSite,
            "o"
          )}
        </tr>
        <tr>
          <th scope="row">
            {this.state.homeTeamName}
            <br></br>
            <small style={{ margin: "0px" }} className="text-muted">
              {this.getFormattedDate(this.props.gameTime)}
            </small>
            <br></br>
            <small>
              <a
                href={
                  "/sports/" + this.props.sport + "/games/" + this.props.gameId
                }
              >
                More Wagers
              </a>
            </small>
          </th>
          {this.getDisplayCell(
            this.state.gameLines.currentHomeSpread,
            this.state.gameLines.currentHomeSpreadPayout,
            this.state.gameLines.homeSpreadSite,
            null
          )}
          {this.getDisplayCell(
            this.state.gameLines.currentHomeMoneyLine,
            null,
            this.state.gameLines.homeMoneyLineSite,
            null
          )}
          {this.getDisplayCell(
            this.state.gameLines.currentUnder,
            this.state.gameLines.currentUnderPayout,
            this.state.gameLines.underSite,
            "u"
          )}
        </tr>
      </React.Fragment>
    );
  }

  getFormattedDate(dateString) {
    let options = {
      hour: "numeric",
      minute: "2-digit",
    };

    if (this.props.sport == "NFL") options["weekday"] = "short";

    return new Date(dateString + "Z").toLocaleTimeString("en-us", options);
  }

  getDisplayCell(val, odds, site, appendedLetters) {
    if (val == null)
      return (
        <td>
          <b>_</b>
        </td>
      );
    if (odds == null)
      //Moneyline
      return (
        <td>
          <b>{this.getDisplayValue(val)}</b>
          <br />
          {site}
        </td>
      );

    return (
      <td>
        {appendedLetters}
        <b>{appendedLetters == null ? this.getDisplayValue(val) : val}</b>
        <sup>{this.getOddsDisplayValue(odds)}</sup>
        <br />
        {site}
      </td>
    );
  }
  getDisplayValue(val) {
    if (val > 0) return "+" + val;
    return val;
  }

  getOddsDisplayValue(val) {
    return "(" + this.getDisplayValue(val) + ")";
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.checkedBooks !== this.props.checkedBooks) {
      await this.getGameLines();
    }
  }

  async getGameLines() {
    var lines = await GameLinesService.getLines(
      this.props.gameId,
      this.props.checkedBooks
    );

    this.setState({ gameLines: lines });
  }
  async getTeamNames() {
    var homeTeam = await TeamService.getTeam(this.props.homeTeamId);
    var awayTeam = await TeamService.getTeam(this.props.awayTeamId);
    this.setState({
      homeTeamName: homeTeam.location + " " + homeTeam.mascot,
      awayTeamName: awayTeam.location + " " + awayTeam.mascot,
    });
  }

  async componentDidMount() {
    await this.getGameLines();
    await this.getTeamNames();
    this.setState({ isLoaded: true });
  }
}

export default GameRow;
