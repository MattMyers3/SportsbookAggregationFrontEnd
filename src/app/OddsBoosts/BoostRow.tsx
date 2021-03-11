import React from "react";
import OddsFormater from "common/helpers/OddsFormater";
import { TableRow, TableCell, makeStyles } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: "#f3f3f3",
  },
  greenText: {
    color: theme.palette.primary.main,
  },
  strike: {
    textDecoration: "line-through",
  },
}));

interface BoostRowProps {
  description: string;
  boostedOdds: number;
  previousOdds: number;
}

const BoostRow = ({
  description,
  boostedOdds,
  previousOdds,
}: BoostRowProps) => {
  const classes = useStyles();
  const previousIsNA = previousOdds === 0;
  return (
    <React.Fragment>
      <TableRow className={classes.row}>
        <TableCell>{description}</TableCell>
        <TableCell className={classes.greenText}>
          {OddsFormater.americanOddSignage(boostedOdds)}
        </TableCell>
        <TableCell className={clsx(!previousIsNA && classes.strike)}>
          {OddsFormater.americanOddSignage(previousOdds)}
        </TableCell>
        <TableCell />
      </TableRow>
    </React.Fragment>
  );
};

export default BoostRow;
