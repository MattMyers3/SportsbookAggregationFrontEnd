import React from "react";
import OddsFormater from "common/helpers/OddsFormater";
import { GameProp } from "common/models/GameProp";
import { makeStyles, TableCell, TableRow } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: "#f3f3f3",
  },
  greenText: {
    color: theme.palette.primary.main,
  },
  cells: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.775rem",
    },
  },
}));

interface PropRowProps {
  playerProp: GameProp;
}

const PropRow = ({ playerProp }: PropRowProps) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <TableRow className={classes.row}>
        <TableCell className={classes.cells}>{playerProp.playerName}</TableCell>
        <TableCell className={clsx(classes.cells, classes.greenText)}>
          {OddsFormater.americanOddSignage(playerProp.currentPayout)}
        </TableCell>
        <TableCell className={classes.cells}>
          {playerProp.currentSite}
        </TableCell>
        <TableCell />
      </TableRow>
    </React.Fragment>
  );
};

export default PropRow;
