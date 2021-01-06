import React from "react";
import { apiUrl } from "variables/constants.js";

class PropRow extends React.Component {
  render() {
    return (
      <React.Fragment>
        <tr className="d-flex">
          <td className="col-6" scope="row">
            {this.props.playerProp.PlayerName}
          </td>
          <td className="col-3">{this.props.playerProp.CurrentPayout}</td>
          <td className="col-3">{this.props.playerProp.CurrentSite}</td>
        </tr>
      </React.Fragment>
    );
  }
}

export default PropRow;
