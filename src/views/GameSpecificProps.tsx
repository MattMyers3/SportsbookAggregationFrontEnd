import React from "react";

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
import { apiUrl } from "common/variables/constants";
import { Form, Jumbotron } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import GamePropSimpleTable from "components/GameProps/SimpleProps/GamePropSimpleTable";
import GamePropTableWithOptions from "components/GameProps/OverUnderProps/GamePropTableWithOptions";
import {GameProp} from "common/models/GameProp";

const animatedComponents = makeAnimated();

interface GameSpecificPropsProps {
  allBooks:any;
  handleSportsbookChange:any;
  checkedBooks:any;
  match:any;
}

interface GameSpecificPropsState {
  GameTime: any;
  HomeTeamName: string;
  HomeTeamId: string;
  AwayTeamName: string;
  AwayTeamId: string;
  GameProps: GameProp[];
  PropTypes: any;
  searchTerm: string;
}

class GameSpecificProps extends React.Component<
  GameSpecificPropsProps,
  GameSpecificPropsState
> {
  state = {
    GameTime: null,
    HomeTeamName: "",
    HomeTeamId: "",
    AwayTeamName: "",
    AwayTeamId: "",
    GameProps: [],
    PropTypes: [],
    searchTerm: "",
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
                      options={this.props.allBooks}
                      components={animatedComponents}
                      onChange={this.props.handleSportsbookChange}
                      placeholderButtonLabel="Sportsbooks..."
                      value={this.props.checkedBooks}
                    />
                  </Col>
                </Row>
              </CardText>
              <FormGroup>
                <Input
                  onChange={this.handleSearch.bind(this)}
                  type="search"
                  placeholder="Player Search"
                ></Input>
              </FormGroup>
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
    fetch(
      apiUrl +
        "/games/" +
        this.props.match.params.gameId +
        "/bestprops?sportsbooks=" +
        this.props.checkedBooks.map((book) => book.value).join()
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          GameProps: data,
        })
      );
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.checkedBooks !== this.props.checkedBooks) {
      if (this.props.checkedBooks == null)
        this.setState({ GameProps: [], PropTypes: [] });
      else this.getGameLines();
    }

    if (prevState.HomeTeamId == "" && this.state.HomeTeamId != "") {
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

    if (prevState.GameProps != this.state.GameProps) {
      let propTypes:any = [];
      if (this.state.GameProps.length > 0) {
        for (let gameProp of this.state.GameProps) {
          let tableTitle = this.getPropTableTitle(gameProp);
          if (!propTypes.includes(tableTitle)) {
            propTypes.push(tableTitle);
          }
        }
      }
      this.setState({ PropTypes: propTypes });
    }
  }

  getPropTableTitle(prop) {
    return prop.propValue === null
      ? prop.propDescription + " " + prop.propTypeDescription
      : prop.propTypeDescription;
  }

  renderErrorMessage() {
    if (this.props.checkedBooks == null || this.props.checkedBooks.length == 0)
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
  }
  renderTable(propType) {
    if (this.state.GameProps == null) return;

    let propsForPropType:any = this.state.GameProps.filter(
      (singleProp) => this.getPropTableTitle(singleProp) == propType
    );
    if (propsForPropType.length == 0) return;

    const first = propsForPropType[0];
    if (first.propValue !== null) {
      return (
        <GamePropTableWithOptions
          propsForPropType={propsForPropType}
          propType={propType}
          searchTerm={this.state.searchTerm}
        ></GamePropTableWithOptions>
      );
    } else {
      return (
        <GamePropSimpleTable
          propsForPropType={propsForPropType}
          propType={propType}
          searchTerm={this.state.searchTerm}
        ></GamePropSimpleTable>
      );
    }
  }

  handleSearch(event) {
    this.setState({ searchTerm: event.target.value.toLowerCase() });
  }
}
export default GameSpecificProps;
