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
import PropRow from "components/PropRow.js";
import PropRowWithOptions from "components/PropRowWithOptions.js"
import { apiUrl } from "variables/constants.js";
import ReactGA from "react-ga";
import { Form, Jumbotron } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { theadProps, theadPropsOverUnder } from "variables/general";

const animatedComponents = makeAnimated();

class GameSpecificProps extends React.Component {
  state = {
    GameTime: null,
    HomeTeamName: null,
    HomeTeamId: null,
    AwayTeamName: null,
    AwayTeamId: null,
    GameProps: [],
    PropTypes: [],
  };

  render() {
    return (
      <>
        <div className="content">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary" tag="h3">
                {this.state.HomeTeamName} vs {this.state.AwayTeamName}
              </CardTitle>
              Player Props
              <br/><br/>
              <CardText>
                <Row>
                  <Col lg={true} s={true} xs={true}>
                    <Form.Label>Select Sportsbooks</Form.Label>
                    <br></br>
                    <Select
                      isSearchable={false}
                      isMulti={true}
                      options={this.props.allBooks}
                      components={animatedComponents}
                      onChange={this.props.handleSportsbookChange}
                      placeholderButtonLabel="Sportsbooks..."
                      value={this.props.checkedBooks}
                    />
                  </Col>
                </Row>
              </CardText>
            </CardHeader>
            <CardBody>
              {this.state.PropTypes == null || this.state.PropTypes.length === 0
                ? this.renderNoBooksCheckedMessage()
                : this.state.PropTypes.map((propType) =>
                    this.renderTable(propType)
                  )}
            </CardBody>
          </Card>
        </div>
      </>
    );
  }

  componentWillMount() {
    const gameProps = this.getPlayerProps();
    let propTypes = [];
    let homeTeamId = null;
    let awayTeamId = null;

    for (let gameProp of gameProps) {
      let tableTitle = this.getPropTableTitle(gameProp);
      if (!propTypes.includes(tableTitle)) {
        propTypes.push(tableTitle);
      }
    }
    fetch(apiUrl + "/games/" + this.props.match.params.gameId)
    .then((res) => res.json())
    .then((data) =>
      this.setState({
        HomeTeamId: data.homeTeamId,
        AwayTeamId: data.awayTeamId,
      })
    );
    this.setState({ GameProps: gameProps, PropTypes: propTypes });
  }

  componentDidUpdate(prevProps, prevState)
  {
    if(prevState.HomeTeamId == null && this.state.HomeTeamId != null)
    {
      fetch(apiUrl + "/teams/" + this.state.HomeTeamId)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          HomeTeamName: data.location + " " + data.mascot,
        })
      );
      fetch(apiUrl + "/teams/" + this.state.AwayTeamId)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          AwayTeamName: data.location + " " + data.mascot,
        })
      );
    }
  }

  getPropTableTitle(prop) {
    return prop.propValue === null ? prop.description + " " + prop.propType : prop.propType;
  }

  renderNoBooksCheckedMessage() {
    return (
      <Jumbotron>
        <h1>No books!</h1>
        <p>
          Please select at least one sportsbook in order to see the available
          odds.
        </p>
      </Jumbotron>
    );
  }
  renderTable(propType) {
      if(this.state.GameProps == null) return;

      let propsForPropType =  this.state.GameProps.filter((singleProp) => this.getPropTableTitle(singleProp) == propType);
      if (propsForPropType.length == 0) return;
      
      const first = propsForPropType[0];
      if(first.propValue !== null){
        return (
          <Table responsive>
            <thead className="text-primary">
              <tr className="d-flex">
                <th className="col-6">{propType}</th>
                {theadPropsOverUnder.map((head) => {
                  return(<th className="col-3">{head}</th>)
                })}
              </tr>
            </thead>
            <tbody className="boosts-striped">
              {this.renderGamePropRowsOverUnder(propsForPropType)}
            </tbody>
          </Table>
        );
      }
      else{
        return (
          <Table responsive>
            <thead className="text-primary">
              <tr className="d-flex">
                <th className="col-6">{propType}</th>
                {theadProps.map((head) => {
                  return(<th className="col-3">{head}</th>)
                })}
              </tr>
            </thead>
            <tbody className="boosts-striped">
              {this.renderGamePropRows(propsForPropType)}
            </tbody>
          </Table>
        );
      }
    
  }

  renderGamePropRows(props) {
    return props.map((singleProp) => {
      return (
        <PropRow
          playerProp={singleProp}
        />
      );
    });
  }
  renderGamePropRowsOverUnder(props) {
    let propsGroupedByName = this.groupBy(props, "name");
    return propsGroupedByName.map((props) => {
      return (
        <PropRowWithOptions
          propList={props.groupList}
        />
      );
    });
  }

  groupBy(props,field){
  let groupedArr = [];
  props.forEach(function(e){
    //look for an existent group
    let group = groupedArr.find(g => g['field'] === e[field]);
    if (group == undefined){
      //add new group if it doesn't exist
      group = {field: e[field], groupList: []};
      groupedArr.push(group);
    }
    
    //add the element to the group
    group.groupList.push(e);
  });
  
  return groupedArr;
}

  formatOdds(odds) {
    if (odds > 0) {
      return "+" + odds;
    } else if (odds == 0) {
      return "N/A";
    } else { 
      return odds;
    }
  }

  getPlayerProps(gameId) {
    const playerProps = {
      props: [
        {
          propType: "Touchdown Scorer",
          description: "First",
          propValue: null,
          name: "Jordan Franklin",
          payout: -110,
          sportsbook: "Fanduel",
        },
        {
          propType: "Touchdown Scorer",
          description: "First",
          propValue: null,
          name: "Matt Myers",
          payout: 500,
          sportsbook: "DraftKings",
        },
        {
          propType: "Touchdown Scorer",
          description: "First",
          propValue: null,
          name: "Nick Smith",
          payout: -250,
          sportsbook: "FoxBet",
        },
        {
          propType: "Touchdown Scorer",
          description: "First",
          propValue: null,
          name: "Matt Murphy",
          payout: 600,
          sportsbook: "Barstool",
        },
        {
          propType: "Touchdown Scorer",
          description: "Anytime",
          propValue: null,
          name: "Jordan Franklin",
          payout: 110,
          sportsbook: "Fanduel",
        },
        {
          propType: "Touchdown Scorer",
          description: "Anytime",
          propValue: null,
          name: "Matt Myers",
          payout: 1000,
          sportsbook: "DraftKings",
        },
        {
          propType: "Touchdown Scorer",
          description: "Anytime",
          propValue: null,
          name: "Nick Smith",
          payout: 250,
          sportsbook: "FoxBet",
        },
        {
          propType: "Touchdown Scorer",
          description: "Anytime",
          propValue: null,
          name: "Matt Murphy",
          payout: 6000,
          sportsbook: "Barstool",
        },
        {
          propType: "Reception Yards",
          name: "Jordan Franklin",
          description: "Under",
          propValue: 75.5,
          payout: 110,
          sportsbook: "Rivers"
        },
        {
          propType: "Reception Yards",
          name: "Jordan Franklin",
          description: "Over",
          propValue: 65.5,
          payout: 110,
          sportsbook: "Barstool"
        },
        {
          propType: "Reception Yards",
          name: "Nick Smith",
          description: "Under",
          propValue: 72.5,
          payout: 110,
          sportsbook: "DraftKings"
        },
        {
          propType: "Reception Yards",
          name: "Nick Smith",
          description: "Over",
          propValue: 67.5,
          payout: 110,
          sportsbook: "FanDuel"
        },

      ],
    };
    return playerProps.props;
  }
}
export default GameSpecificProps;
