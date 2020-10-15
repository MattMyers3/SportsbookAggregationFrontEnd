import React from 'react';

class BoostRow extends React.Component {

    render()
    {
        return (
            <React.Fragment>
                <tr className="d-flex">
                    <th className="col-6" scope="row">{this.props.description}</th>
                    <td className="col-3">{this.props.boostedOdds}</td>
                    <td className="col-3" style={{textDecoration: "line-through"}}>{this.props.previousOdds}</td>
                </tr>
            </React.Fragment>
            )
    };
}

export default BoostRow;