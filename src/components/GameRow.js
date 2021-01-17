import React from "react";
import { apiUrl } from "variables/constants.js";

class GameRow extends React.Component {
  state = {
    homeTeamName: null,
    awayTeamName: null,
    currentAwaySpread: 0,
    currentAwaySpreadPayout: 0,
    currentAwaySpreadSite: null,
    currentHomeSpread: 0,
    currentHomeSpreadPayout: 0,
    currentHomeSpreadSite: null,
    currentOver: 0,
    currentOverPayout: 0,
    currentOverSite: null,
    currentUnder: 0,
    currentUnderPayout: 0,
    currentUnderSite: null,
    currentHomeMoneyline: 0,
    currentHomeMoneylineSite: null,
    currentAwayMoneyline: 0,
    currentAwayMoneylineSite: null,
  };

  render() {
    if(this.state.currentAwaySpread == null && this.state.currentAwayMoneyline == null && this.state.currentOver == null &&
      this.state.currentHomeSpread == null && this.state.currentHomeMoneyline == null && this.state.currentUnder == null){
          return(<React.Fragment></React.Fragment>);
      }
    return (
      <React.Fragment>
        <tr>
          <th scope="row">{this.state.awayTeamName}</th>
          {this.getDisplayCell(
            this.state.currentAwaySpread,
            this.state.currentAwaySpreadPayout,
            this.state.currentAwaySpreadSite,
            null
          )}
          {this.getDisplayCell(
            this.state.currentAwayMoneyline,
            null,
            this.state.currentAwayMoneylineSite,
            null
          )}
          {this.getDisplayCell(
            this.state.currentOver,
            this.state.currentOverPayout,
            this.state.currentOverSite,
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
              <b>
                <a colspan="2" class="text-primary" href={"/sports/" + this.props.sport + "/games/" + this.props.gameId}>More Wagers</a>  
              </b>
            </small>
          </th>
          {this.getDisplayCell(
            this.state.currentHomeSpread,
            this.state.currentHomeSpreadPayout,
            this.state.currentHomeSpreadSite,
            null
          )}
          {this.getDisplayCell(
            this.state.currentHomeMoneyline,
            null,
            this.state.currentHomeMoneylineSite,
            null
          )}
          {this.getDisplayCell(
            this.state.currentUnder,
            this.state.currentUnderPayout,
            this.state.currentUnderSite,
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

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.checkedBooks !== this.props.checkedBooks) {
      this.getGameLines();
    }
  }

  getGameLines() {
    fetch(
      apiUrl +
        "/GameLines/best/" +
        this.props.gameId +
        "?sportsbooks=" +
        this.props.checkedBooks.join()
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          currentAwaySpread: data.currentAwaySpread,
          currentAwaySpreadPayout: data.currentAwaySpreadPayout,
          currentAwaySpreadSite: data.awaySpreadSite,
          currentHomeSpread: data.currentHomeSpread,
          currentHomeSpreadPayout: data.currentHomeSpreadPayout,
          currentHomeSpreadSite: data.homeSpreadSite,
          currentAwayMoneyline: data.currentAwayMoneyLine,
          currentAwayMoneylineSite: data.awayMoneyLineSite,
          currentHomeMoneyline: data.currentHomeMoneyLine,
          currentHomeMoneylineSite: data.homeMoneyLineSite,
          currentOver: data.currentOver,
          currentOverPayout: data.currentOverPayout,
          currentOverSite: data.overSite,
          currentUnder: data.currentUnder,
          currentUnderPayout: data.currentUnderPayout,
          currentUnderSite: data.underSite,
        })
      )
      .catch();
  }

  componentWillMount() {
    this.getGameLines();
    fetch(apiUrl + "/teams/" + this.props.homeTeamId)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          homeTeamName: data.location + " " + data.mascot,
        })
      );

    fetch(apiUrl + "/teams/" + this.props.awayTeamId)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          awayTeamName: data.location + " " + data.mascot,
        })
      );
  }
}

export default GameRow;