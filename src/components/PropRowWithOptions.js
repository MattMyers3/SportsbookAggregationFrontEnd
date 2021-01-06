import React from "react";

export class PropRowWithOptions extends React.Component {
    render() {
        let under = this.props.propList.find(prop => prop.description == "Under");
        let over = this.props.propList.find(prop => prop.description == "Over");
        
        return (
            <React.Fragment>
                <tr className="d-flex">
                    <td className="col-6" scope="row">
                        {under.name}
                    </td>
                    <td className="col-3">
                        <b>{under.propValue}</b>
                        <sup>({under.payout})</sup>
                        <br></br>
                        {under.sportsbook}
                    </td>
                    <td className="col-3">
                    <b>{over.propValue}</b>
                    <sup>({over.payout})</sup>
                    <br></br>
                    {over.sportsbook}
                </td>
                </tr>
            </React.Fragment>
        );
    }
}
export default PropRowWithOptions;
