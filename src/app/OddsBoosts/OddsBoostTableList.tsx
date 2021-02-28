import React, {useEffect, useState} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  CardText,
} from "reactstrap";
import { theadOddsBoosts } from "common/variables/general";
import "react-datepicker/dist/react-datepicker.css";
import BoostRow from "app/OddsBoosts/BoostRow";
import { Form, Jumbotron } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { OddsBoost } from "common/models/OddsBoost";
import LastRefreshTimeService from "common/services/LastRefreshTimeService";
import OddsBoostService from "common/services/OddsBoostService";

const animatedComponents = makeAnimated();

interface BoostRegularTablesProps {
  sport: string;
  allBooks: string[];
  handleSportsbookChange: Function;
  checkedBooks: string[];
}

const BoostRegularTables = ({sport, allBooks, handleSportsbookChange, checkedBooks}: BoostRegularTablesProps) => {
  const [OddsBoosts, setOddsBoosts] = useState<OddsBoost[]>([]);
  const [LastRefreshTime, setLastRefreshTime] = useState(new Date());

  const renderOddsBoostRows = (sportsbook) => {
    var bookBoosts =
      OddsBoosts != null
        ? OddsBoosts.filter(
            (boost) => boost.siteName === sportsbook.value
          )
        : null;
    if (bookBoosts == null) return;

    return bookBoosts.map((boost) => {
      return (
        <BoostRow
          key={boost.oddsboostid}
          description={boost.description}
          previousOdds={boost.previousOdds}
          boostedOdds={boost.boostedOdds}
        />
      );
    });
  };

  const renderNoBooksCheckedMessage = () => {
    return (
      <Jumbotron>
        <h1>No books!</h1>
        <p>
          Please select at least one sportsbook in order to see the available
          odds.
        </p>
      </Jumbotron>
    );
  };

  const renderTable = (sportsbook) => {
    if (
      OddsBoosts == null ||
      OddsBoosts.filter(
        (boost) => boost.siteName === sportsbook.value
      ).length === 0
    )
      return;

    return (
      <Table responsive>
        <thead className="text-primary">
          <tr className="d-flex">
            <th className="col-6">{sportsbook.value}</th>
            {theadOddsBoosts.map((prop, key) => {
              if (key === theadOddsBoosts.length - 1)
                return (
                  <th className="col-3 text-left" key={key}>
                    {prop}
                  </th>
                );
              return (
                <th className="col-3" key={key}>
                  {prop}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="boosts-striped">
          {renderOddsBoostRows(sportsbook)}
        </tbody>
      </Table>
    );
  };

  const getFormattedDate = (dateString) => {
    let options = {
      hour: "numeric",
      minute: "2-digit",
    };

    return new Date(dateString + "Z").toLocaleTimeString("en-us", options);
  };

  useEffect(() => {
    const setOddsBoostsAndLastRefresh = async () => {
      const oddsBoosts = await OddsBoostService.getOddsBoosts();
      setOddsBoosts(oddsBoosts);

      const lastRefreshTime = await LastRefreshTimeService.getRefreshTime(
        "OddsBoosts"
      );
      setLastRefreshTime(lastRefreshTime);
    };
    setOddsBoostsAndLastRefresh();
  }, [OddsBoosts, LastRefreshTime]);

  return (
    <>
      <div className="content">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary" tag="h3">
              {sport}
            </CardTitle>
            <CardText>
              <div className="text-muted">
                Last Refresh Time:{" "}
                {getFormattedDate(LastRefreshTime)}
              </div>
              <br />
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
          </CardHeader>
          <CardBody>
            {checkedBooks == null ||
            checkedBooks.length === 0
              ? renderNoBooksCheckedMessage()
              : checkedBooks.map((book) => renderTable(book))}
          </CardBody>
        </Card>
      </div>
    </>
  );
}

export default BoostRegularTables;
