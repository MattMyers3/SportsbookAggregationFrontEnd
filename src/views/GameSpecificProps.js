import React from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  CardText
} from "reactstrap";


import "react-datepicker/dist/react-datepicker.css";
import PropRow from "components/PropRow.js";
import PropRowWithOptions from "components/PropRowWithOptions.js"
import { apiUrl } from "variables/constants.js";
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
                {this.state.AwayTeamName} @ {this.state.HomeTeamName}
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
                ? this.renderErrorMessage()
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
     fetch(apiUrl + "/games/" + this.props.match.params.gameId)
    .then((res) => res.json())
    .then((data) =>
      this.setState({
        HomeTeamId: data.homeTeamId,
        AwayTeamId: data.awayTeamId,
      })
    );    
  }

  getGameLines() {
    fetch(apiUrl + "/games/" + this.props.match.params.gameId + "/bestprops?sportsbooks=" + this.props.checkedBooks.map(book => book.value).join())
    .then((res) => res.json())
    .then((data) =>
      this.setState({
        GameProps: data
      })
    );
  }

  componentDidUpdate(prevProps, prevState)
  {
    if (prevProps.checkedBooks !== this.props.checkedBooks) {
      if(this.props.checkedBooks == null)
        this.setState({GameProps : [], PropTypes: []});
      else
        this.getGameLines();
    }

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

    if(prevState.GameProps != this.state.GameProps)
    {
      let propTypes = [];
      if(this.state.GameProps.length > 0)
      {
        for (let gameProp of this.state.GameProps) {
          let tableTitle = this.getPropTableTitle(gameProp);
          if (!propTypes.includes(tableTitle)) {
            propTypes.push(tableTitle);
          }
        }
      }
      this.setState({ PropTypes: propTypes});
    }
  }

  getPropTableTitle(prop) {
    return prop.propValue === null ? prop.propDescription + " " + prop.propTypeDescription : prop.propTypeDescription;
  }

  renderErrorMessage() {
    if(this.props.checkedBooks == null || this.props.checkedBooks.length == 0)
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
          <p>
            There are no props available for this game at this time.
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
    return props.sort(function(a,b){ return a.currentPayout - b.currentPayout}).map((singleProp) => {
      return (
        <PropRow
          playerProp={singleProp}
        />
      );
    });
  }
  renderGamePropRowsOverUnder(props) {
    let propsGroupedByName = this.groupBy(props, "playerName");
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
}
export default GameSpecificProps;
