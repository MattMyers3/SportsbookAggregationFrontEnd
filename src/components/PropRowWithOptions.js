import React from "react";

export class PropRowWithOptions extends React.Component {
    render() {
        let under = this.props.propList.find(prop => prop.description == "Under");
        let over = this.props.propList.find(prop => prop.description == "Over");
        
        return (
            <React.Fragment>
                <tr className="d-flex">
                    <td className="col-6" scope="row">
                        {under.PlayerName}
                    </td>
                    <td className="col-3">
                        <b>{under.PropValue}</b>
                        <sup>({under.CurrentPayout})</sup>
                        <br></br>
                        {under.CurrentSite}
                    </td>
                    <td className="col-3">
                    <b>{over.PropValue}</b>
                    <sup>({over.CurrentPayout})</sup>
                    <br></br>
                    {over.CurrentSite}
                </td>
                </tr>
            </React.Fragment>
        );
    }
}
export default PropRowWithOptions;
