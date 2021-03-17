import React, { Component, useState } from "react";
import OddsFormater from "common/helpers/OddsFormater";
import { GameProp } from "common/models/GameProp";
import { makeStyles, TableCell, TableRow } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: "#f3f3f3",
  },
  greenText: {
    color: theme.palette.primary.main,
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
        <TableCell>{playerProp.playerName}</TableCell>
        <TableCell className={classes.greenText}>
          {OddsFormater.americanOddSignage(playerProp.currentPayout)}
        </TableCell>
        <TableCell>{playerProp.currentSite}</TableCell>
        <TableCell />
      </TableRow>
    </React.Fragment>
  );
};

export default PropRow;
