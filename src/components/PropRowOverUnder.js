import React from "react";

export class PropRowOverUnder extends React.Component {
    render() {
        debugger;
        return (
            <React.Fragment>
                <tr className="d-flex">
                    <td className="col-6" scope="row">
                        {this.props.firstName} {this.props.lastName}{" "}
                        {this.props.description}
                    </td>
                    <td className="col-3">
                        <b>{this.props.overLine}</b>
                        <sup>({this.props.overPayout})</sup>
                        <br></br>
                        {this.props.overSportsbook}
                    </td>
                    <td className="col-3">
                        <b>{this.props.underLine}</b>
                        <sup>({this.props.underPayout})</sup>
                        <br></br>
                        {this.props.underSportsbook}
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}
export default PropRowOverUnder;
