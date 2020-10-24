import React from "react";
import { apiUrl } from "variables/constants.js";

class PropRow extends React.Component {
    render()
    {
        return (
            <React.Fragment>
                <tr className="d-flex">
                    <td className="col-6" scope="row">{this.props.firstName} {this.props.lastName} {this.props.description}</td>
                    <td className="col-3">{this.props.odds}</td>
                    <td className="col-3">{this.props.sportsbook}</td>
                </tr>
            </React.Fragment>
            )
    };
}

export default PropRow;
