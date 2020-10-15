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

import { theadOddsBoosts } from "variables/general";

import "react-datepicker/dist/react-datepicker.css";
import BoostRow from "components/BoostRow.js";
import { apiUrl } from "variables/constants.js";
import ReactGA from "react-ga";
import { Form, Jumbotron } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

const animatedComponents = makeAnimated();

class BoostRegularTables extends React.Component {
  state = {
    allBooks: [],
    oddsBoosts: [],
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
                {this.props.sport}
              </CardTitle>
              <CardText>
                <div className="text-muted">
                  Last Refresh Time:{" "}
                  {this.getFormattedDate(this.state.lastRefreshTime)}
                </div>
                <br />
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
              {this.props.checkedBooks == null || this.props.checkedBooks.length === 0 ? this.renderNoBooksCheckedMessage() : this.props.checkedBooks.map((book) => this.renderTable(book))}
            </CardBody>
          </Card>
        </div>
      </>
    );
  }

  renderOddsBoostRows(sportsbook)
  {
    var bookBoosts = this.state.oddsBoosts != null ? this.state.oddsBoosts.filter(boost => boost.siteName == sportsbook.value) : null;
    if(bookBoosts == null)
      return;

    return bookBoosts.map((boost) => {
      return (
        <BoostRow
          key={boost.oddsboostid}
          description={boost.description}
          previousOdds={this.formatOdds(boost.previousOdds)}
          boostedOdds={this.formatOdds(boost.boostedOdds)}
          />
      );
    })
  }

  formatOdds(odds){
    if(odds > 0){
      return "+" + odds;
    }
    else if(odds == 0){
      return "N/A";
    }
  }

  renderNoBooksCheckedMessage(){
    return <Jumbotron> 
              <h1>No books!</h1> 
              <p>Please select at least one sportsbook in order to see the available odds boosts.</p>
            </Jumbotron>

  }

  renderTable(sportsbook){
    if(this.state.oddsBoosts == null || this.state.oddsBoosts.filter(boost => boost.siteName == sportsbook.value).length == 0)
      return

    return <Table responsive>
      <thead className="text-primary">
        <tr className="d-flex">
          <th className="col-6">{sportsbook.value}</th>
          {theadOddsBoosts.map((prop, key) => {
            if (key === theadOddsBoosts.length - 1)
              return (
                <th className="col-3" key={key} className="text-left">
                  {prop}
                </th>
              );
            return <th className="col-3" key={key}>{prop}</th>;
          })}
        </tr>
      </thead>
      <tbody className="boosts-striped">{this.renderOddsBoostRows(sportsbook)}</tbody>
    </Table>
  }

  getFormattedDate(dateString) {
    let options = {
      hour: "numeric",
      minute: "2-digit",
    };

    return new Date(dateString + "Z").toLocaleTimeString("en-us", options);
  }

  componentWillMount() {
    fetch(apiUrl + "/oddsboosts")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ oddsBoosts: data});
      });

    fetch(apiUrl + "/OddsBoosts/LastRefreshTime")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ lastRefreshTime: data.lastRefreshTime });
      });
  }
}

export default BoostRegularTables;
