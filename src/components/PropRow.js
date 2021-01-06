import React from "react";
import { apiUrl } from "variables/constants.js";

class PropRow extends React.Component {
  render() {
    return (
      <React.Fragment>
        <tr className="d-flex">
          <td className="col-6" scope="row">
            {this.props.playerProp.name}
          </td>
          <td className="col-3">{this.props.playerProp.payout}</td>
          <td className="col-3">{this.props.playerProp.sportsbook}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default PropRow;
