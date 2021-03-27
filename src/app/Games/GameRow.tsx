import React, { useEffect, useState } from "react";
import GameLinesService from "common/services/GameLinesService";
import { GameLines } from "common/models/GameLines";
import TeamService from "common/services/TeamService";
import { 
  TableRow, 
  TableCell, 
  withStyles, 
  createStyles, 
  makeStyles, 
  Typography, 
  Button,
  useMediaQuery,
  useTheme } from "@material-ui/core";
  import clsx from "clsx";

const StyledTableRow = withStyles((theme) =>
  createStyles({
    root: {
      borderBottom: 'none',
    },
  }),
)(TableRow);

const StyledTableCellData = withStyles((theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
  }),
)(TableCell);

const MoreWagersButton = withStyles((theme) =>
  createStyles({
    root: {
      background: 'linear-gradient(136deg, #FFD047, #FFB347)',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      '&:hover': {
        color: 'black'
      },
      [theme.breakpoints.down("sm")]: {
        fontSize: '0.675rem',
        whiteSpace: 'nowrap',
        marginTop: '-2em'
      },
    }
  }),
)(Button);

const StyledTableCellHeader = withStyles((theme) =>
  createStyles({
    root: {
      border: 'none',
    },
  }),
)(TableCell);

const MoreWagersTableCell = withStyles((theme) =>
  createStyles({
    root: {
      border: 'none',
      padding: 0
    },
  }),
)(TableCell);

const GameTimeTypography = withStyles((theme) =>
  createStyles({
    root: {
      fontSize: 'small',
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.675rem",
      },
    },
  }),
)(Typography);

const useStyles = makeStyles((theme) => ({
  fontDisplayMobile: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.675rem",
    },
  },
  oddsDisplay: {
    whiteSpace: 'nowrap',
    color: '#20b33c',
    fontWeight: 'bold',
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.675rem",
    },
  },
  betValueDisplay: {
    fontWeight: 'bold',
    paddingRight: '5px',
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.675rem",
    },
  },
  awayBorderDisplayDesktop: {
    borderTop: 'solid 1px #d8d8d8',
    '&:nth-of-type(5n+5)': {
      borderRight: 'solid 1px #d8d8d8',
    },
    '&:nth-of-type(5n+1)': {
      borderLeft: 'solid 1px #d8d8d8',
    },
  },
  awayBorderDisplayMobile: {
    borderTop: 'solid 1px #d8d8d8',
    '&:nth-of-type(4n+4)': {
      borderRight: 'solid 1px #d8d8d8',
    },
    '&:nth-of-type(4n+1)': {
      borderLeft: 'solid 1px #d8d8d8',
    },
  },
  homeBorderDisplay: {
    borderBottom: 'solid 1px #d8d8d8',
    '&:nth-of-type(4n+4)': {
      borderRight: 'solid 1px #d8d8d8',
    },
    '&:nth-of-type(4n+1)': {
      borderLeft: 'solid 1px #d8d8d8',
    },
  }
}));

interface GameRowProps {
  sport: string;
  homeTeamId: string;
  awayTeamId: string;
  gameId: string;
  checkedBooks: string[];
  gameTime: string;
}

const GameRow = ({
  sport,
  homeTeamId,
  awayTeamId,
  gameId,
  checkedBooks,
  gameTime,
}: GameRowProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    appendedLetters: string | null,
    awayBorder: boolean
  ) => {
    if (val == null)
      return (
        <StyledTableCellData className={awayBorder ? clsx(!isMobile && classes.awayBorderDisplayDesktop, isMobile && classes.awayBorderDisplayMobile) : classes.homeBorderDisplay}>
          <Typography className={classes.betValueDisplay}>_</Typography>
        </StyledTableCellData>
      );
    if (odds == null)
      //Moneyline
      return (
        <StyledTableCellData className={awayBorder ? clsx(!isMobile && classes.awayBorderDisplayDesktop, isMobile && classes.awayBorderDisplayMobile) : classes.homeBorderDisplay}>
          <Typography className={classes.oddsDisplay}>{getDisplayValue(val)}</Typography>
          <Typography className={classes.fontDisplayMobile}>{site}</Typography>
        </StyledTableCellData>
      );

    return (
      <StyledTableCellData className={awayBorder ? clsx(!isMobile && classes.awayBorderDisplayDesktop, isMobile && classes.awayBorderDisplayMobile) : classes.homeBorderDisplay}>
        <Typography style={{display: 'inline-block'}} className={classes.betValueDisplay}>{appendedLetters}{appendedLetters == null ? getDisplayValue(val) : val}</Typography>
        <Typography style={{display: 'inline-block'}} className={classes.oddsDisplay}>{getDisplayValue(odds)}</Typography>
        <Typography className={classes.fontDisplayMobile}>{site}</Typography>
      </StyledTableCellData>
    );
  };

  const getDisplayValue = (val: number) => {
    if (val > 0) return "+" + val;
    return val;
  };

  const getGameLines = async () => {
    return await GameLinesService.getLines(gameId, checkedBooks);
  };

  const getTeamNames = async () => {
    var homeTeam = await TeamService.getTeam(homeTeamId);
    var awayTeam = await TeamService.getTeam(awayTeamId);
    setHomeTeamName(homeTeam.location + " " + homeTeam.mascot);
    setAwayTeamName(awayTeam.location + " " + awayTeam.mascot);
  };

  useEffect(() => {
    let mounted = true;
    const asyncWrapper = async () => {
      await getGameLines();
      await getTeamNames();
    };

    asyncWrapper();
    if(mounted) {
      setIsLoaded(true);
    }

    return function(){
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    getGameLines().then(lines => {
      if(mounted) {
        setCurrentGameLines(lines);
      }
    })

    return function(){
      mounted = false;
    };
  }, [checkedBooks]);

  if (!IsLoaded) {
    return <React.Fragment></React.Fragment>;
  } 
  else if (
    !CurrentGameLines.awayMoneyLineSite &&
    !CurrentGameLines.awaySpreadSite &&
    !CurrentGameLines.underSite &&
    !CurrentGameLines.homeMoneyLineSite &&
    !CurrentGameLines.homeSpreadSite &&
    !CurrentGameLines.overSite
  ) {
    return <React.Fragment></React.Fragment>;
  } 
  else if (
    !CurrentGameLines.currentAwaySpread &&
    !CurrentGameLines.currentAwayMoneyLine &&
    !CurrentGameLines.currentOver &&
    !CurrentGameLines.currentHomeSpread &&
    !CurrentGameLines.currentHomeMoneyLine &&
    !CurrentGameLines.currentUnder
  ) {
    return <React.Fragment></React.Fragment>;
  }

  return (
    <React.Fragment>
      <StyledTableRow>
        <StyledTableCellData className={clsx(!isMobile && classes.awayBorderDisplayDesktop, isMobile && classes.awayBorderDisplayMobile)} scope="row">
          <Typography className={classes.fontDisplayMobile}>{AwayTeamName}</Typography>
        </StyledTableCellData>
        {!isMobile &&
          <StyledTableCellData rowSpan={2} className={clsx(!isMobile && classes.awayBorderDisplayDesktop, isMobile && classes.awayBorderDisplayMobile)}>
            <MoreWagersButton href={"/sports/" + sport + "/games/" + gameId} variant="contained">
              More Wagers
            </MoreWagersButton>
          </StyledTableCellData> 
        }
        {getDisplayCell(
          CurrentGameLines.currentAwaySpread,
          CurrentGameLines.currentAwaySpreadPayout,
          CurrentGameLines.awaySpreadSite,
          null,
          true
        )}
        {getDisplayCell(
          CurrentGameLines.currentAwayMoneyLine,
          null,
          CurrentGameLines.awayMoneyLineSite,
          null,
          true
        )}
        {getDisplayCell(
          CurrentGameLines.currentOver,
          CurrentGameLines.currentOverPayout,
          CurrentGameLines.overSite,
          "o",
          true
        )}
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCellData className={classes.homeBorderDisplay} scope="row">
          <Typography className={classes.fontDisplayMobile}>{HomeTeamName}</Typography>
          <GameTimeTypography color="textSecondary">
            {getFormattedDate(gameTime)}
          </GameTimeTypography>
        </StyledTableCellData>
        
        {getDisplayCell(
          CurrentGameLines.currentHomeSpread,
          CurrentGameLines.currentHomeSpreadPayout,
          CurrentGameLines.homeSpreadSite,
          null,
          false
        )}
        {getDisplayCell(
          CurrentGameLines.currentHomeMoneyLine,
          null,
          CurrentGameLines.homeMoneyLineSite,
          null,
          false
        )}
        {getDisplayCell(
          CurrentGameLines.currentUnder,
          CurrentGameLines.currentUnderPayout,
          CurrentGameLines.underSite,
          "u",
          false
        )}
      </StyledTableRow>
      {isMobile &&
        <TableRow>
          <MoreWagersTableCell align="center" colSpan={4}>
            <MoreWagersButton href={"/sports/" + sport + "/games/" + gameId} variant="contained">
                    More Wagers
            </MoreWagersButton>
          </MoreWagersTableCell>
        </TableRow>
      }
      <TableRow><StyledTableCellHeader></StyledTableCellHeader></TableRow>
    </React.Fragment>
  );
};
export default GameRow;
