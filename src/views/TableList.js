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
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  CardText,
  Container,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead } from "variables/general";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GameRow from "components/GameRow.js";
import { apiUrl } from "variables/constants.js";
import ReactGA from "react-ga";
import { Form } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

class RegularTables extends React.Component {
  state = {
    checkedBooks: [],
    allBooks: [],
    games: [],
    startDate: new Date(),
    endDate: new Date(),
    lastRefreshTime: new Date(),
  };

  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary" tag="h3">
                {this.props.sport} Best Lines (PA)
              </CardTitle>
              <CardText>
                <div className="text-muted">
                  Last Refresh Time:{" "}
                  {this.getFormattedDate(this.state.lastRefreshTime)}
                </div>
                <br />
                <Row>
                  <Col lg={2}>{this.getDateSelector()}</Col>
                  <br />
                  <Col lg={{ span: 2, offset: 6 }} s={true} xs={true}>
                    <Form.Label>Select Sportsbooks</Form.Label>
                    <br></br>
                   
                  </Col>
                </Row>
              </CardText>
            </CardHeader>
            <CardBody>
              <Table responsive>
                <thead className="text-primary">
                  <tr>
                    {thead.map((prop, key) => {
                      if (key === thead.length - 1)
                        return (
                          <th key={key} className="text-left">
                            {prop}
                          </th>
                        );
                      return <th key={key}>{prop}</th>;
                    })}
                  </tr>
                </thead>
                <tbody className="games-striped">{this.renderGameRows()}</tbody>
              </Table>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
  renderGameRows() {
    var sortGames = this.state.games;
    sortGames.sort(function (a, b) {
      return new Date(a.timeStamp) - new Date(b.timeStamp);
    });
    return sortGames.map((game, key) => {
      return (
        <GameRow
          key={game.gameId}
          sport={this.props.sport}
          homeTeamId={game.homeTeamId}
          awayTeamId={game.awayTeamId}
          gameId={game.gameId}
          checkedBooks={this.state.checkedBooks.map((book) => book.value)}
          gameTime={game.timeStamp}
        />
      );
    });
  }

  getFormattedDate(dateString) {
    let options = {
      hour: "numeric",
      minute: "2-digit",
    };

    return new Date(dateString + "Z").toLocaleTimeString("en-us", options);
  }

  getDateSelector() {
    if (this.props.sport === "NFL") {
      return (
        <Form>
          <Form.Label>Select Week</Form.Label>
          <Form.Control as="select" defaultValue={this.getDefaultDateSelect()} onChange={this.handleWeekChange.bind(this)} >
            <option value="9/10/2020-9/15/2020">Week 1</option>
            <option value="9/17/2020-9/22/2020">Week 2</option>
            <option value="9/24/2020-9/29/2020">Week 3</option>
            <option value="10/01/2020-10/06/2020">Week 4</option>
            <option value="10/08/2020-10/13/2020">Week 5</option>
            <option value="10/15/2020-10/20/2020">Week 6</option>
            <option value="10/22/2020-10/27/2020">Week 7</option>
            <option value="10/29/2020-11/03/2020">Week 8</option>
            <option value="11/05/2020-11/10/2020">Week 9</option>
            <option value="11/12/2020-11/17/2020">Week 10</option>
            <option value="11/19/2020-11/24/2020">Week 11</option>
            <option value="11/26/2020-12/01/2020">Week 12</option>
            <option value="12/03/2020-12/08/2020">Week 13</option>
            <option value="12/10/2020-12/15/2020">Week 14</option>
            <option value="12/17/2020-12/22/2020">Week 15</option>
            <option value="12/24/2020-12/29/2020">Week 16</option>
            <option value="12/31/2020-01/05/2020">Week 17</option>
          </Form.Control>
        </Form>
      );
    } else {
      return (
        <div>
          <Form.Label>Select Date</Form.Label>
          <br></br>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateChange}
          />
        </div>
      );
    }
  }

  handleCheck = (books) => {
    this.setState({
      checkedBooks: books,
    });
  };

  handleDateChange = date => {
    this.setState({
      startDate: date,
    });

    ReactGA.event({
      category: "User",
      action: "Changed date",
      value: date,
    });
  };

  handleWeekChange(event) {
    var dateRange = event.target.value.split('-');
    var now = new Date();
    var startDate = new Date(dateRange[0].split("/"));
    if(now > startDate)
      startDate = now;
    var endDate = new Date(dateRange[1].split("/"));
    this.setState({
      startDate : startDate,
      endDate : endDate
    });
  }

  getDefaultDateSelect() {
    var currentDate = new Date();
    var currentDay = currentDate.getDate();
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    if (currentYear === 2020 || currentYear === 2021) {
      if (currentMonth === 8) {
        if (currentDay >= 10 && currentDay <= 14) {
          return "9/10/2020-9/15/2020";
        }
        else if (currentDay >= 15 && currentDay <= 21) {
          return "9/17/2020-9/22/2020";
        }
        else if (currentDay >= 22 && currentDay <= 28) {
          return "9/24/2020-9/29/2020";
        }
        else if (currentDay >= 29) {
          return "10/01/2020-10/06/2020";
        }
      } else if (currentMonth === 9) {
        if (currentDay >= 1 && currentDay <= 5) {
          return "10/01/2020-10/06/2020";
        }
        else if (currentDay >= 6 && currentDay <= 12) {
          return "10/08/2020-10/13/2020";
        }
        else if (currentDay >= 13 && currentDay <= 19) {
          return "10/15/2020-10/20/2020";
        }
        else if (currentDay >= 20 && currentDay <= 26) {
          return "10/22/2020-10/27/2020";
        }
        else if (currentDay >= 27) {
          return "10/29/2020-11/03/2020";
        }
      } else if (currentMonth === 10) {
        if (currentDay <= 2) {
          return "10/29/2020-11/03/2020";
        }
        else if (currentDay >= 3 && currentDay <= 9) {
          return "11/05/2020-11/10/2020";
        }
        else if (currentDay >= 10 && currentDay <= 16) {
          return "11/12/2020-11/17/2020";
        }
        else if (currentDay >= 17 && currentDay <= 23) {
          return "11/19/2020-11/24/2020";
        }
        else if (currentDay >= 24 && currentDay <= 30) {
          return "11/26/2020-12/01/2020";
        }
        else if (currentDay >= 31) {
          return "12/03/2020-12/08/2020";
        }
      } else if (currentMonth === 11) {
        if (currentDay >= 1 && currentDay <= 7) {
          return "12/03/2020-12/07/2020";
        } else if (currentDay >= 8 && currentDay <= 14) {
          return "12/10/2020-12/14/2020";
        } else if (currentDay >= 15 && currentDay <= 21) {
          return "12/17/2020-12/21/2020";
        } else if (currentDay >= 22 && currentDay <= 28) {
          return "12/24/2020-12/28/2020";
        } else if (currentDay >= 29) {
          return "12/31/2020-01/04/2020";
        }
      } else if (currentMonth === 0) {
        if (currentDay <= 4) {
          return "12/31/2020-01/04/2020";
        }
      }
    }
    return "9/10/2020-9/15/2020";
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.startDate === this.state.startDate &&
      prevState.endDate === this.state.endDate &&
      prevProps.sport === this.props.sport
    )
      return;

    if(prevProps.sport !== this.props.sport) {
      if(this.props.sport != "NFL")
        this.setState({ startDate: new Date() })
      else {
        var dateRange = this.getDefaultDateSelect().split('-');
        var startDate = new Date();
        var endDate = dateRange[1].split("/");
        this.setState({startDate : startDate, endDate : endDate});
      }
    }

    if(prevState.startDate !== this.state.startDate){
      if(this.state.startDate.getDate() < new Date().getDate()) // Don't show games in the past
        this.setState({games : []});
      else if(this.props.sport != "NFL")
        this.fetchGamesOnDay(this.state.startDate);
      else {
        this.fetchGamesInRange(this.state.startDate, this.state.endDate);
      }
    }
  }

  componentWillMount() {
    if (this.props.sport === "NFL") {
      var dateRange = this.getDefaultDateSelect().split('-');
      var startDate = new Date();
      var endDate = new Date(dateRange[1].split("/"));
      this.fetchGamesInRange(startDate, endDate);
    }
    else {
      this.fetchGamesOnDay(new Date());
    }

    fetch(apiUrl + "/gamblingsite")
      .then((res) => res.json())
      .then((data) => {
        var books = data.map((site) => {
          const container = {};

          container["value"] = site.name;
          container["label"] = site.name;

          return container;
        });
        this.setState({ checkedBooks: books, allBooks: books });
      });

    fetch(apiUrl + "/GameLines/LastRefreshTime")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ lastRefreshTime: data.lastRefreshTime });
      });
  }

  fetchGamesInRange(startDate, endDate) {
    endDate.setHours(23,59,59,999);
    fetch(apiUrl + '/games?start=' + startDate.toISOString() +
      '&end=' + endDate.toISOString() +
      '&sport=' + this.props.sport)
      .then(res => res.json())
      .then(data => this.setState({ games: data }))
  }

  fetchGamesOnDay(date) {
    var endTime = new Date(date);
    this.fetchGamesInRange(date, endTime);
  }
}

export default RegularTables;
