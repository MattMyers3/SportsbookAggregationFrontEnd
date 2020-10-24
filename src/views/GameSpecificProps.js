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
import { apiUrl } from "variables/constants.js";
import ReactGA from "react-ga";
import { Form, Jumbotron } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { theadProps } from "variables/general";

const animatedComponents = makeAnimated();

class GameSpecificProps extends React.Component {
  state = {
    allBooks: [],
    GameProps: [],
    PropTypes: [],
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
                Player Props
              </CardTitle>
              <CardText>
                {/* <div className="text-muted">
                  Last Refresh Time:{" "}
                  {this.getFormattedDate(this.state.lastRefreshTime)}
                </div>
                <br /> */}
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
    for (let gameProp of gameProps) {
      if (!propTypes.includes(gameProp.propType)) {
        propTypes.push(gameProp.propType);
      }
    }
    this.setState({ GameProps: gameProps, PropTypes: propTypes });
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
    if (
      this.state.GameProps == null ||
      this.state.GameProps.filter(
        (singleProp) => singleProp.propType == propType
      ).length == 0
    )
      return;

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
          {this.renderGamePropRows(propType)}
        </tbody>
      </Table>
    );
  }

  renderGamePropRows(propType) {
    var playerProps =
      this.state.GameProps != null
        ? this.state.GameProps.filter((prop) => prop.propType == propType)
        : null;
    if (playerProps == null) return;

    return playerProps.map((singleProp) => {
      return (
        <PropRow
          firstName={singleProp.firstName}
          lastName={singleProp.lastName}
          description={singleProp.description}
          odds={this.formatOdds(singleProp.payout)}
          sportsbook={singleProp.sportsbook}
        />
      );
    });
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

  getPlayerProps(game) {
    const playerProps = {
      props: [
        {
          propType: "Anytime Scorer",
          firstName: "Jordan",
          lastName: "Franklin",
          description: "to score",
          payout: -110,
          sportsbook: "Fanduel",
        },
        {
          propType: "Anytime Scorer",
          firstName: "Matt",
          lastName: "Myers",
          description: "to score",
          payout: 500,
          sportsbook: "DraftKings",
        },
        {
          propType: "Anytime Scorer",
          firstName: "Nick",
          lastName: "Smith",
          description: "to score",
          payout: -250,
          sportsbook: "FoxBet",
        },
        {
          propType: "Anytime Scorer",
          firstName: "Matt",
          lastName: "Murphy",
          description: "to score",
          payout: 600,
          sportsbook: "Barstool",
        },
        {
          propType: "First TD Scorer",
          firstName: "Jordan",
          lastName: "Franklin",
          description: "to score first",
          payout: 110,
          sportsbook: "Fanduel",
        },
        {
          propType: "First TD Scorer",
          firstName: "Matt",
          lastName: "Myers",
          description: "to score first",
          payout: 1000,
          sportsbook: "DraftKings",
        },
        {
          propType: "First TD Scorer",
          firstName: "Nick",
          lastName: "Smith",
          description: "to score first",
          payout: 250,
          sportsbook: "FoxBet",
        },
        {
          propType: "First TD Scorer",
          firstName: "Matt",
          lastName: "Murphy",
          description: "to score first",
          payout: 6000,
          sportsbook: "Barstool",
        },
      ],
    };
    return playerProps.props;
  }
}
export default GameSpecificProps;
