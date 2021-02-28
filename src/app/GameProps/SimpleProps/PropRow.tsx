import React, { Component } from "react";
import OddsFormater from "common/services/odds-formater";
import { GameProp } from "common/models/GameProp";

interface PropRowProps {
  playerProp: GameProp;
}

const PropRow = ({playerProp}: PropRowProps) => {
  return (
    <React.Fragment>
      <tr className="d-flex">
        <td className="col-6" scope="row">
          {playerProp.playerName}
        </td>
        <td className="col-3">
          {OddsFormater.americanOddSignage(
            playerProp.currentPayout
          )}
        </td>
        <td className="col-3">{playerProp.currentSite}</td>
      </tr>
    </React.Fragment>
  );
} 

export default PropRow;
