import React, { useEffect, useState } from "react";
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

const GameRow = ({
  key,
  sport,
  homeTeamId,
  awayTeamId,
  gameId,
  checkedBooks,
  gameTime,
}: GameRowProps) => {
  const [CurrentGameLines, setCurrentGameLines] = useState<GameLines>(
    {} as GameLines
  );
  const [HomeTeamName, setHomeTeamName] = useState("");
  const [AwayTeamName, setAwayTeamName] = useState("");
  const [IsLoaded, setIsLoaded] = useState(false);

  const getFormattedDate = (dateString: string) => {
    let options = {
      hour: "numeric",
      minute: "2-digit",
    };

    if (sport === "NFL") options["weekday"] = "short";

    return new Date(dateString + "Z").toLocaleTimeString("en-us", options);
  };

  const getDisplayCell = (
    val: number,
    odds: number | null,
    site: string,
    appendedLetters: string | null
  ) => {
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
          <b>{getDisplayValue(val)}</b>
          <br />
          {site}
        </td>
      );

    return (
      <td>
        {appendedLetters}
        <b>{appendedLetters == null ? getDisplayValue(val) : val}</b>
        <sup>{getOddsDisplayValue(odds)}</sup>
        <br />
        {site}
      </td>
    );
  };

  const getDisplayValue = (val: number) => {
    if (val > 0) return "+" + val;
    return val;
  };

  const getOddsDisplayValue = (val: number) => {
    return "(" + getDisplayValue(val) + ")";
  };

  const getGameLines = async () => {
    var lines = await GameLinesService.getLines(gameId, checkedBooks);

    setCurrentGameLines(lines);
  };

  const getTeamNames = async () => {
    var homeTeam = await TeamService.getTeam(homeTeamId);
    var awayTeam = await TeamService.getTeam(awayTeamId);
    setHomeTeamName(homeTeam.location + " " + homeTeam.mascot);
    setAwayTeamName(awayTeam.location + " " + awayTeam.mascot);
  };

  useEffect(() => {
    const asyncWrapper = async () => {
      await getGameLines();
      await getTeamNames();
    };

    asyncWrapper();
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    getGameLines();
  }, [checkedBooks]);

  if (!IsLoaded) {
    return <React.Fragment></React.Fragment>;
  } else if (
    !CurrentGameLines.awayMoneyLineSite &&
    !CurrentGameLines.awaySpreadSite &&
    !CurrentGameLines.underSite &&
    !CurrentGameLines.homeMoneyLineSite &&
    !CurrentGameLines.homeSpreadSite &&
    !CurrentGameLines.overSite
  ) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <React.Fragment>
      <tr>
        <th scope="row">{AwayTeamName}</th>
        {getDisplayCell(
          CurrentGameLines.currentAwaySpread,
          CurrentGameLines.currentAwaySpreadPayout,
          CurrentGameLines.awaySpreadSite,
          null
        )}
        {getDisplayCell(
          CurrentGameLines.currentAwayMoneyLine,
          null,
          CurrentGameLines.awayMoneyLineSite,
          null
        )}
        {getDisplayCell(
          CurrentGameLines.currentOver,
          CurrentGameLines.currentOverPayout,
          CurrentGameLines.overSite,
          "o"
        )}
      </tr>
      <tr>
        <th scope="row">
          {HomeTeamName}
          <br></br>
          <small style={{ margin: "0px" }} className="text-muted">
            {getFormattedDate(gameTime)}
          </small>
          <br></br>
          <small>
            <b>
              <a href={"/sports/" + sport + "/games/" + gameId}>More Wagers</a>
            </b>
          </small>
        </th>
        {getDisplayCell(
          CurrentGameLines.currentHomeSpread,
          CurrentGameLines.currentHomeSpreadPayout,
          CurrentGameLines.homeSpreadSite,
          null
        )}
        {getDisplayCell(
          CurrentGameLines.currentHomeMoneyLine,
          null,
          CurrentGameLines.homeMoneyLineSite,
          null
        )}
        {getDisplayCell(
          CurrentGameLines.currentUnder,
          CurrentGameLines.currentUnderPayout,
          CurrentGameLines.underSite,
          "u"
        )}
      </tr>
    </React.Fragment>
  );
};
export default GameRow;
