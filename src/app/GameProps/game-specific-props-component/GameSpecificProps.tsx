import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import GamePropSimpleTable from "app/GameProps/SimpleProps/GamePropSimpleTable";
import GamePropTableWithOptions from "app/GameProps/OverUnderProps/GamePropTableWithOptions";
import { GameProp } from "common/models/GameProp";
import { Book } from "common/models/Book";
import TeamService from "common/services/TeamService";
import GamePropsService from "common/services/GamePropsService";
import GamesService from "common/services/GamesService";
import useStyles from "./GameSpecificPropsStyles";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  TableContainer,
} from "@material-ui/core";
import SportsbookSelector from "common/components/SportsbookSelector/SportsbookSelector";
import SearchBox from "common/components/SearchBox/SearchBox";

interface GameSpecificPropsProps {
  allBooks: Book[];
  handleSportsbookChange: Function;
  checkedBooks: Book[];
  match: any;
}

const GameSpecificProps = ({
  allBooks,
  handleSportsbookChange,
  checkedBooks,
  match,
}: GameSpecificPropsProps) => {
  const classes = useStyles();
  const [HomeTeamName, setHomeTeamName] = useState("");
  const [HomeTeamId, setHomeTeamId] = useState("");
  const [AwayTeamName, setAwayTeamName] = useState("");
  const [AwayTeamId, setAwayTeamId] = useState("");
  const [GameProps, setGameProps] = useState<GameProp[]>([]);
  const [PropTypes, setPropTypes] = useState<String[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getTeamIdsFromGameId = async () => {
      const game = await GamesService.getGameById(match.params.gameId);
      setHomeTeamId(game.homeTeamId);
      setAwayTeamId(game.awayTeamId);
    };
    getTeamIdsFromGameId();
  }, [match.params.gameId]);

  useEffect(() => {
    const getTeamNames = async () => {
      const homeTeam = await TeamService.getTeam(HomeTeamId);
      const awayTeam = await TeamService.getTeam(AwayTeamId);

      setHomeTeamName(homeTeam.location + " " + homeTeam.mascot);
      setAwayTeamName(awayTeam.location + " " + awayTeam.mascot);
    };

    if (AwayTeamId !== "" && HomeTeamId !== "") getTeamNames();
  }, [AwayTeamId, HomeTeamId]);

  useEffect(() => {
    const getGameLines = async () => {
      const props = await GamePropsService.getProps(
        match.params.gameId,
        checkedBooks
      );
      setGameProps(props);
    };
    if (!checkedBooks || checkedBooks.length === 0) {
      setGameProps([]);
      setPropTypes([]);
    } else {
      getGameLines();
    }
  }, [checkedBooks, match.params.gameId]);

  useEffect(() => {
    let propTypes: any = [];
    if (GameProps.length > 0) {
      for (let gameProp of GameProps) {
        let tableTitle = getPropTableTitle(gameProp);
        if (!propTypes.includes(tableTitle)) {
          propTypes.push(tableTitle);
        }
      }
    }
    setPropTypes(propTypes);
  }, [GameProps]);

  const getPropTableTitle = (prop: GameProp) => {
    return prop.propValue === null
      ? prop.propDescription + " " + prop.propTypeDescription
      : prop.propTypeDescription;
  };
  const renderErrorMessage = () => {
    if (!checkedBooks || checkedBooks.length === 0)
      return (
        <Jumbotron>
          <h1>No books!</h1>
          <p>
            Please select at least one sportsbook in order to see the available
            odds.
          </p>
        </Jumbotron>
      );
    else
      return (
        <Jumbotron>
          <h1>No Props!</h1>
          <p>There are no props available for this game at this time.</p>
        </Jumbotron>
      );
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const renderTable = (propType) => {
    if (!GameProps) return;

    let propsForPropType: any = GameProps.filter(
      (singleProp) => getPropTableTitle(singleProp) === propType
    );
    if (propsForPropType.length === 0) return;

    const first = propsForPropType[0];
    if (first.propValue !== null) {
      return (
        <GamePropTableWithOptions
          propsForPropType={propsForPropType}
          propType={propType}
          searchTerm={searchTerm}
        ></GamePropTableWithOptions>
      );
    } else {
      return (
        <GamePropSimpleTable
          propsForPropType={propsForPropType}
          propType={propType}
          searchTerm={searchTerm}
        ></GamePropSimpleTable>
      );
    }
  };

  return (
    <div className={classes.root}>
      <Container>
        <Typography className={classes.heading}>
          {AwayTeamName} @ {HomeTeamName}
        </Typography>
        <Typography className={classes.subheading}>Player Props</Typography>
        <Card className={classes.card}>
          <CardContent>
            <Grid
              container
              spacing={2}
              justify="space-between"
              alignItems="flex-start"
              direction="row"
            >
              <Grid item xs={12} md={8}>
                <SportsbookSelector
                  allBooks={allBooks}
                  checkedBooks={checkedBooks}
                  handleSportsBookChange={handleSportsbookChange}
                ></SportsbookSelector>
              </Grid>
              <Grid item xs={12} md={4}>
                <SearchBox
                  handleSearch={handleSearch}
                  placeholder={"Search player"}
                ></SearchBox>
              </Grid>
            </Grid>
          </CardContent>
          <CardContent>
            <TableContainer className={classes.tableContainer}>
              {PropTypes == null || PropTypes.length === 0
                ? renderErrorMessage()
                : PropTypes.map((propType) => renderTable(propType))}
            </TableContainer>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};
export default GameSpecificProps;
