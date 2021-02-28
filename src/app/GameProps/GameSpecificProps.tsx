import React, { useEffect, useState } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  CardText,
  FormGroup,
  Input,
} from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";
import { Form, Jumbotron } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import GamePropSimpleTable from "app/GameProps/SimpleProps/GamePropSimpleTable";
import GamePropTableWithOptions from "app/GameProps/OverUnderProps/GamePropTableWithOptions";
import { GameProp } from "common/models/GameProp";
import { Book } from "common/models/Book";
import TeamService from "common/services/TeamService";
import GamePropsService from "common/services/GamePropsService";
import GamesService from "common/services/GamesService";

const animatedComponents = makeAnimated();

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
    if (!checkedBooks) {
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

  const handleSearch = (event: any) => {
    setSearchTerm(event.target.value.toLowerCase());
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
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary" tag="h3">
              {AwayTeamName} @ {HomeTeamName}
            </CardTitle>
            Player Props
            <br />
            <br />
            <CardText>
              <Row>
                <Col lg={true} s={true} xs={true}>
                  <Form.Label>Select Sportsbooks</Form.Label>
                  <br></br>
                  <Select
                    isSearchable={false}
                    isMulti={true}
                    options={allBooks}
                    components={animatedComponents}
                    onChange={handleSportsbookChange}
                    placeholderButtonLabel="Sportsbooks..."
                    value={checkedBooks}
                  />
                </Col>
              </Row>
            </CardText>
            <FormGroup>
              <Input
                onChange={handleSearch}
                type="search"
                placeholder="Player Search"
              ></Input>
            </FormGroup>
          </CardHeader>
          <CardBody>
            {PropTypes == null || PropTypes.length === 0
              ? renderErrorMessage()
              : PropTypes.map((propType) => renderTable(propType))}
          </CardBody>
        </Card>
      </div>
    </>
  );
};
export default GameSpecificProps;