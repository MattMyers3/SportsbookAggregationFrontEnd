import React, { useEffect, useState } from "react";
import GameLinesService from "common/services/GameLinesService";
import { GameLines } from "common/models/GameLines";
import TeamService from "common/services/TeamService";
import { TableRow, TableCell, withStyles, createStyles, makeStyles, Typography } from "@material-ui/core";

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      '&:nth-of-type(4n+1)': {
        //backgroundColor: theme.palette.action.hover,
      },
      '&:nth-of-type(4n+2)': {
        //backgroundColor: theme.palette.action.hover,
      }
    },
  }),
)(TableRow);

const StyledTableCellData = withStyles((theme) =>
  createStyles({
    root: {
      border: 'solid 1px #d8d8d8',
      padding: '5px 7px',
      textAlign: 'center'
    },
  }),
)(TableCell);

const useStyles = makeStyles((theme) => ({
  oddsDisplay: {
    whiteSpace: 'nowrap',
    color: '#20b33c',
    fontWeight: 'bold',
  },
  betValueDisplay: {
    fontWeight: 'bold',
    paddingRight: '5px'
  },
}));

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
  const classes = useStyles();

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
        <StyledTableCellData>
          <b>_</b>
        </StyledTableCellData>
      );
    if (odds == null)
      //Moneyline
      return (
        <StyledTableCellData>
          <Typography className={classes.oddsDisplay}>{getDisplayValue(val)}</Typography>
          {site}
        </StyledTableCellData>
      );

    return (
      <StyledTableCellData>
        {appendedLetters}
        <Typography style={{display: 'inline-block'}} className={classes.betValueDisplay}>{appendedLetters == null ? getDisplayValue(val) : val}</Typography>
        <Typography style={{display: 'inline-block'}} className={classes.oddsDisplay}>{getDisplayValue(odds)}</Typography>
        <br />
        {site}
      </StyledTableCellData>
    );
  };

  const getDisplayValue = (val: number) => {
    if (val > 0) return "+" + val;
    return val;
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
      <StyledTableRow>
        <StyledTableCellData component="th" scope="row">{AwayTeamName}</StyledTableCellData>
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
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCellData component="th" scope="row">
          {HomeTeamName}
          <br></br>
          <small className="text-muted">
            {getFormattedDate(gameTime)}
          </small>
        </StyledTableCellData>
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
      </StyledTableRow>
    </React.Fragment>
  );
};
export default GameRow;
