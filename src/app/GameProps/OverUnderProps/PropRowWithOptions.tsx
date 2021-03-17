import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import { GameProp } from "common/models/GameProp";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: "#f3f3f3",
  },
  greenText: {
    color: theme.palette.primary.main,
  },
  freeMoney: {
    backgroundColor: theme.palette.tertiary.main,
  },
}));

interface PropRowWithOptionsProps {
  propList: GameProp[];
}

const PropRowWithOptions = ({ propList }: PropRowWithOptionsProps) => {
  const classes = useStyles();
  let under = propList.find((prop) => prop.propDescription === "Under");
  let over = propList.find((prop) => prop.propDescription === "Over");
  const renderRow = () => {
    if (under && over) {
      const isFreeMoney = under.currentPayout + over.currentPayout > 0;
      return (
        <TableRow
          className={clsx(classes.row, isFreeMoney && classes.freeMoney)}
        >
          <TableCell>{under.playerName}</TableCell>

          <TableCell>
            <b>{over.propValue}</b>
            <sup className={classes.greenText}>{over.currentPayout}</sup>
            <br></br>
            {over.currentSite}
          </TableCell>
          <TableCell>
            <b>{under.propValue}</b>
            <sup className={classes.greenText}>{under.currentPayout}</sup>
            <br></br>
            {under.currentSite}
          </TableCell>
          <TableCell />
        </TableRow>
      );
    }
  };
  return <React.Fragment>{renderRow()}</React.Fragment>;
};
export default PropRowWithOptions;
