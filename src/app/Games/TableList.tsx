/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  CardText,
} from "reactstrap";

import { GamesTableHeader } from "common/variables/general";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GameRow from "app/Games/GameRow";
import ReactGA from "react-ga";
import { Form, Jumbotron } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Game } from "common/models/Game";
import { Book } from "common/models/Book";
import LastRefreshTimeService from "common/services/LastRefreshTimeService";
import GamesService from "common/services/GamesService";
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, withStyles, createStyles, makeStyles } from "@material-ui/core";

const StyledTable = withStyles((theme) =>
  createStyles({
    root: {
      borderCollapse: 'separate'
    },
  }),
)(Table);

const StyledTableCellHeader = withStyles((theme) =>
  createStyles({
    root: {
      border: 'none',
      color: '#4b5258',
      textTransform: 'uppercase',
      fontWeight: 'bold'
    },
  }),
)(TableCell);

const animatedComponents = makeAnimated();

interface TableListProps {
  sport: string;
  allBooks: Book[];
  checkedBooks: Book[];
  handleSportsbookChange: Function;
  isLoggedIn: string;
  setUserDefaults: Function;
}

const RegularTables = ({sport, allBooks, checkedBooks, handleSportsbookChange, isLoggedIn, setUserDefaults} : TableListProps) => {

  const [EndDate, setEndDate] = useState<Date>(new Date());
  const [StartDate, setStartDate] = useState<Date>(new Date());
  const [LastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const [Games, setGames] = useState<Game[]>([]);

  const renderGameRows = () => {
    var sortGames = Games;
    sortGames.sort(function (a, b) {
      return Math.abs(
        new Date(a.timeStamp).getTime() - new Date(b.timeStamp).getTime()
      );
    });
    return sortGames.map((game) => {
      return (
        <React.Fragment>
        <GameRow
          key={game.gameId}
          sport={sport}
          homeTeamId={game.homeTeamId}
          awayTeamId={game.awayTeamId}
          gameId={game.gameId}
          checkedBooks={
            checkedBooks != null
              ? checkedBooks.map((book) => book.value)
              : []
          }
          gameTime={game.timeStamp}
        />
        </React.Fragment>
      );
    });
  };

  const renderNoGamesWeekMessage = () => {
    return (
      <Jumbotron>
        <h1>Lines not available!</h1>
        <p>Please select a different week</p>
      </Jumbotron>
    );
  };

  const renderNoGamesTodayMessage = () => {
    return (
      <Jumbotron>
        <h1>No Games Today!</h1>
        <p>Please use the calendar to select a new date</p>
      </Jumbotron>
    );
  };

  const renderNoBooksCheckedMessage = () => {
    return (
      <Jumbotron>
        <h1>No books!</h1>
        <p>
          Please select at least one sportsbook in order to see the best
          available game lines.
        </p>
      </Jumbotron>
    );
  };

  const renderTable = () => {
    return (
      <TableContainer>
        <StyledTable>
          <TableHead className="text-primary">
            <TableRow>
              {GamesTableHeader.map((prop, key) => {
                return <StyledTableCellHeader align='center' key={key}>{prop}</StyledTableCellHeader>
              })}
            </TableRow>
          </TableHead>
          <TableBody>{renderGameRows()}</TableBody>
        </StyledTable>
      </TableContainer>
    );
  }

  const getFormattedDate = (dateString) => {
    let options = {
      hour: "numeric",
      minute: "2-digit",
    };

    return new Date(dateString + "Z").toLocaleTimeString("en-us", options);
  };

  const getDateSelector = () => {
    if (sport === "NFL") {
      return (
        <Form>
          <Form.Label>Select Week</Form.Label>
          <Form.Control
            as="select"
            defaultValue={getDefaultDateSelect()}
            onChange={handleWeekChange}
          >
            <option value="12/31/2020-01/05/2021">Week 17</option>
            <option value="1/07/2021-01/11/2021">Wildcard Weekend</option>
            <option value="01/15/2021-01/18/2021">Divisional Round</option>
            <option value="01/23/2021-01/25/2021">
              Conference Championships
            </option>
            <option value="02/06/2021-02/08/2021">Super Bowl</option>
          </Form.Control>
        </Form>
      );
    } else {
      return (
        <div>
          <Form.Label>Select Date</Form.Label>
          <br></br>
          <DatePicker
            selected={StartDate}
            onChange={handleDateChange}
          />
        </div>
      );
    }
  }

  const handleDateChange = (date) => {
    if (date.getDate() > new Date().getDate()) date.setHours(0, 0, 0);
    setStartDate(date);

    ReactGA.event({
      category: "User",
      action: "Changed date",
      value: date,
    });
  };

  const handleWeekChange = (event) => {
    var dateRange = event.target.value.split("-");
    var now = new Date();
    var startDate = new Date(dateRange[0]);
    if (now > startDate) startDate = now;
    var endDate = new Date(dateRange[1]);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const getDefaultDateSelect = () => {
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    if (currentYear === 2020 || currentYear === 2021) {
      if (currentMonth === 8) {
        if (currentDay >= 10 && currentDay <= 14) {
          return "9/10/2020-9/15/2020";
        } else if (currentDay >= 15 && currentDay <= 21) {
          return "9/17/2020-9/22/2020";
        } else if (currentDay >= 22 && currentDay <= 28) {
          return "9/24/2020-9/29/2020";
        } else if (currentDay >= 29) {
          return "10/01/2020-10/06/2020";
        }
      } else if (currentMonth === 9) {
        if (currentDay >= 1 && currentDay <= 5) {
          return "10/01/2020-10/06/2020";
        } else if (currentDay >= 6 && currentDay <= 12) {
          return "10/08/2020-10/13/2020";
        } else if (currentDay >= 13 && currentDay <= 19) {
          return "10/15/2020-10/20/2020";
        } else if (currentDay >= 20 && currentDay <= 26) {
          return "10/22/2020-10/27/2020";
        } else if (currentDay >= 27) {
          return "10/29/2020-11/03/2020";
        }
      } else if (currentMonth === 10) {
        if (currentDay <= 2) {
          return "10/29/2020-11/03/2020";
        } else if (currentDay >= 3 && currentDay <= 9) {
          return "11/05/2020-11/10/2020";
        } else if (currentDay >= 10 && currentDay <= 16) {
          return "11/12/2020-11/17/2020";
        } else if (currentDay >= 17 && currentDay <= 23) {
          return "11/19/2020-11/24/2020";
        } else if (currentDay >= 24 && currentDay <= 30) {
          return "11/26/2020-12/01/2020";
        } else if (currentDay >= 31) {
          return "12/03/2020-12/08/2020";
        }
      } else if (currentMonth === 11) {
        if (currentDay >= 1 && currentDay <= 7) {
          return "12/03/2020-12/08/2020";
        } else if (currentDay >= 8 && currentDay <= 14) {
          return "12/10/2020-12/15/2020";
        } else if (currentDay >= 15 && currentDay <= 21) {
          return "12/17/2020-12/22/2020";
        } else if (currentDay >= 22 && currentDay <= 28) {
          return "12/24/2020-12/29/2020";
        } else if (currentDay >= 29) {
          return "12/31/2020-01/05/2020";
        }
      } else if (currentMonth === 0) {
        if (currentDay <= 4) {
          return "12/31/2020-01/05/2021";
        }
        if (currentDay <= 10) {
          return "1/07/2021-01/11/2021";
        }
        if (currentDay <= 17) {
          return "01/15/2021-01/18/2021";
        }
        if (currentDay <= 24) {
          return "01/23/2021-01/25/2021";
        }
        return "02/06/2021-02/08/2021";
      } else if (currentMonth === 1) {
        return "02/06/2021-02/08/2021";
      }
    }
    return "9/10/2020-9/15/2020";
  }

  useEffect(() => {
    if(sport === "NFL")
    {
      var dateRange = getDefaultDateSelect().split("-");
      setEndDate(new Date(dateRange[1]))
    }
  },[]);

  useEffect(() => {
    if (sport === "NFL") {
      fetchGamesInRange(StartDate, EndDate);
    } else {
      fetchGamesOnDay(StartDate);
    }
  },[StartDate, EndDate]);

  useEffect(() => {
    const asyncWrapper = async() => {
      let refreshTime = await LastRefreshTimeService.getRefreshTime("GameLines");
      setLastRefreshTime(refreshTime);
    };
    
    asyncWrapper();
  },[Games]);

  const fetchGamesInRange = async (startDate: Date, endDate: Date) => {
    endDate.setHours(23, 59, 59, 999);
    const games = await GamesService.getGamesByDateRange(
      startDate,
      endDate,
      sport
    );
    setGames(games);
  }

  const fetchGamesOnDay = (date) => {
    var endTime = new Date(date);
    fetchGamesInRange(date, endTime);
  }

    return (
      <>
        <div className="content">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary" tag="h3">
                {sport} Best Lines (PA)
              </CardTitle>
              <CardText>
                <div className="text-muted">
                  Last Refresh Time:{" "}
                  {getFormattedDate(LastRefreshTime)}
                </div>
                <br />
                <Row>
                  <Col lg={2}>{getDateSelector()}</Col>
                  <br />
                  <Col lg={{ span: 2, offset: 6 }} s={true} xs={true}>
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
                    {isLoggedIn && (
                      <Button onClick={setUserDefaults}>
                        Save Selections
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardText>
            </CardHeader>
            <CardBody>
              {Games.length === 0
                ? sport === "NFL"
                  ? renderNoGamesWeekMessage()
                  : renderNoGamesTodayMessage()
                : checkedBooks == null ||
                  checkedBooks.length === 0
                ? renderNoBooksCheckedMessage()
                : renderTable()}
            </CardBody>
          </Card>
        </div>
      </>
    );
};

export default RegularTables;
