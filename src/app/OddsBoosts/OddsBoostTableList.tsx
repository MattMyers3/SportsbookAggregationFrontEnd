import {
  Card,
  CardContent,
  Container,
  Grid,
  makeStyles,
  Typography,
  TableContainer,
} from "@material-ui/core";
import BoostRow from "app/OddsBoosts/BoostRow";
import SportsbookSelector from "common/components/SportsbookSelector/SportsbookSelector";
import AccordionTable from "common/components/Tables/AccordionTable/AccordionTable";
import { LoadingStatus } from "common/enums/loadingStatus";
import { Book } from "common/models/Book";
import { OddsBoost } from "common/models/OddsBoost";
import LastRefreshTimeService from "common/services/LastRefreshTimeService";
import OddsBoostService from "common/services/OddsBoostService";
import { theadOddsBoosts } from "common/variables/headerNames";
import React, { useEffect, useState } from "react";
import { Jumbotron } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: "1.5rem",
    color: "#000000",
    marginTop: "1rem",
  },
  subheading: {
    marginBottom: "0.5rem",
  },
  tableContainer: {
    overflowY: "hidden",
  },
  card: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "-1rem",
      marginRight: "-1rem",
    },
  },
}));
interface BoostRegularTablesProps {
  sport: string;
  allBooks: Book[];
  handleSportsbookChange: Function;
  checkedBooks: Book[];
}

const BoostRegularTables = ({
  sport,
  allBooks,
  handleSportsbookChange,
  checkedBooks,
}: BoostRegularTablesProps) => {
  const classes = useStyles();
  const [OddsBoosts, setOddsBoosts] = useState<OddsBoost[]>([]);
  const [LastRefreshTime, setLastRefreshTime] = useState(new Date());
  const [TableState, setTableState] = useState(LoadingStatus.LOADING);

  useEffect(() => {
    const setOddsBoostsWrapper = async () => {
      const oddsBoosts = await OddsBoostService.getOddsBoosts();
      setOddsBoosts(oddsBoosts);
      setTableState(LoadingStatus.SUCCESS);
    };
    setOddsBoostsWrapper();
  }, [OddsBoosts]);

  useEffect(() => {
    const setLastTime = async () => {
      const lastRefreshTime = await LastRefreshTimeService.getRefreshTime(
        "OddsBoosts"
      );
      setLastRefreshTime(lastRefreshTime);
    };

    setLastTime();
  }, [LastRefreshTime]);

  const renderOddsBoostRows = (sportsbook) => {
    var bookBoosts =
      OddsBoosts != null
        ? OddsBoosts.filter((boost) => boost.siteName === sportsbook.value)
        : null;
    if (bookBoosts == null) return;

    return bookBoosts.map((boost, i) => {
      return (
        <BoostRow
          key={i}
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
      OddsBoosts.filter((boost) => boost.siteName === sportsbook.value)
        .length === 0
    ) {
      return;
    }

    return (
      <AccordionTable
        headers={[sportsbook.value, theadOddsBoosts[0], theadOddsBoosts[1]]}
        widths={[60, 20, 20]}
      >
        {renderOddsBoostRows(sportsbook)}
      </AccordionTable>
    );
  };

  const getFormattedDate = (dateString) => {
    let options: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "2-digit",
    };

    return new Date(dateString + "Z").toLocaleTimeString("en-us", options);
  };

  return (
    <>
      <div className={classes.root}>
        <Container>
          <Typography className={classes.heading}>Odds Boosts</Typography>
          <Typography className={classes.subheading}>
            Last Refresh Time: {getFormattedDate(LastRefreshTime)}
          </Typography>
          <Card className={classes.card}>
            <CardContent>
              <Grid
                container
                spacing={2}
                justify="space-between"
                alignItems="flex-start"
                direction="row"
              >
                <Grid item xs={12} md={8}>
                  <SportsbookSelector
                    allBooks={allBooks}
                    checkedBooks={checkedBooks}
                    handleSportsBookChange={handleSportsbookChange}
                  ></SportsbookSelector>
                </Grid>
              </Grid>
            </CardContent>
            <CardContent>
              <TableContainer className={classes.tableContainer}>
                {checkedBooks === null ||
                checkedBooks.length === 0 ||
                TableState === LoadingStatus.LOADING
                  ? renderNoBooksCheckedMessage()
                  : checkedBooks.map((book) => renderTable(book))}
              </TableContainer>
            </CardContent>
          </Card>
        </Container>
      </div>
    </>
  );
};

export default BoostRegularTables;
