import React from "react";
import OddsFormater from "common/odds-formater"

class PropRow extends React.Component {
  render() {
    return (
      <React.Fragment>
        <tr className="d-flex">
          <td className="col-6" scope="row">
            {this.props.playerProp.playerName}
          </td>
          <td className="col-3">{OddsFormater.americanOddSignage(this.props.playerProp.currentPayout)}</td>
          <td className="col-3">{this.props.playerProp.currentSite}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default PropRow;
