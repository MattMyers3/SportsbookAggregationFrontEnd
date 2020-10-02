import React from "react";
import GameRow from "./GameRow";
import { apiUrl } from "./Constants";
import { Form, Jumbotron } from "react-bootstrap";

class GameTableList extends React.Component {
  state = {
    lastRefreshTime: new Date(),
    futureGames: false,
    relevantGames: this.props.games
  };

  render() {
    return (
      <div className="mt-3">
        <Form>
            <Form.Check
              type="checkbox"
              checked={!!this.state.futureGames}
              onChange={this.handleFutureGames.bind(this)}
              label="Only Future Games"
            />
        </Form>
        <small>
          Last Refresh Time: {this.state.lastRefreshTime.toLocaleDateString()}{" "}
          {this.state.lastRefreshTime.toLocaleTimeString()}{" "}
        </small>
        {this.props.games.length === 0
          ? this.props.sport === "NFL"
            ? this.renderNoGamesWeekMessage()
            : this.renderNoGamesTodayMessage()
          : this.props.checkedBooks.length === 0
          ? this.renderNoBooksCheckedMessage()
          : this.renderTable()}
      </div>
    );
  }

  renderTable() {
    return (
      <table className="table table-hover">
        <thead
          className="thead-dark"
          style={{
            borderLeft: "2px solid black",
            borderRight: "2px solid black",
            borderTop: "2px solid black",
            borderBottom: "2px solid black",
          }}
        >
          <tr>
            <th scope="col">Games</th>
            <th scope="col">Spread</th>
            <th scope="col">ML</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          {this.state.relevantGames.map((game, i) => (
            <GameRow
              key={game.gameId}
              homeTeamId={game.homeTeamId}
              awayTeamId={game.awayTeamId}
              gameId={game.gameId}
              checkedBooks={this.props.checkedBooks}
              gameTime={game.timeStamp}
            />
          ))}
        </tbody>
      </table>
    );
  }

  renderNoGamesWeekMessage() {
    return (
      <Jumbotron>
        <h1>Lines not available yet!</h1>
        <p>Please select a different week</p>
      </Jumbotron>
    );
  }

  renderNoGamesTodayMessage() {
    return (
      <Jumbotron>
        <h1>No Games Today!</h1>
        <p>Please use the calendar to select a new date</p>
      </Jumbotron>
    );
  }

  renderNoBooksCheckedMessage() {
    return (
      <Jumbotron>
        <h1>No books!</h1>
        <p>
          Please check at least one sportsbook in order to see the best
          available game lines.
        </p>
      </Jumbotron>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.games !== this.props.games){
      this.applyFilters(this.state.futureGames);
  }
  }

  componentDidMount() {
    fetch(apiUrl + "/GameLines/LastRefreshTime")
      .then((res) => res.json())
      .then((data) => {
        var serverDateArray = data.lastRefreshTime.toString().split("T");
        var dateArray = serverDateArray[0].split("-");
        var timeArray = serverDateArray[1].split(":");
        this.setState({
          lastRefreshTime: new Date(
            Date.UTC(
              dateArray[0],
              dateArray[1],
              dateArray[2],
              timeArray[0],
              timeArray[1],
              timeArray[2]
            )
          ),
        });
      });
  }
  applyFilters(futureFilter){
    if (futureFilter) {
        this.setState({
          relevantGames: this.props.games.filter(
            (game) => new Date(game.timeStamp) > new Date()
          ),
        });
      } else {
        this.setState({ relevantGames: this.props.games });
      }
  }
  handleFutureGames() {
    var currentState = !this.state.futureGames;
    this.setState({ futureGames: currentState });
    this.applyFilters(currentState);
  }
}

export default GameTableList;
