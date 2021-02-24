import React, { Component } from "react";
import OddsFormater from "common/helpers/OddsFormater";
import { GameProp } from "common/models/GameProp";
interface PropRowProps {
  playerProp: GameProp;
}

interface PropRowState {}

class PropRow extends Component<PropRowProps, PropRowState> {
  render() {
    return (
      <React.Fragment>
        <tr className="d-flex">
          <td className="col-6" scope="row">
            {this.props.playerProp.playerName}
          </td>
          <td className="col-3">
            {OddsFormater.americanOddSignage(
              this.props.playerProp.currentPayout
            )}
          </td>
          <td className="col-3">{this.props.playerProp.currentSite}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default PropRow;
