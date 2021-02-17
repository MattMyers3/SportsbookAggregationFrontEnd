import React from "react";
import OddsFormater from "common/helpers/OddsFormater";
interface BoostRowProps {
  description: string;
  boostedOdds: number;
  previousOdds: number;
}

interface BoostRowState {}
class BoostRow extends React.Component<BoostRowProps, BoostRowState> {
  render() {
    return (
      <React.Fragment>
        <tr className="d-flex">
          <th className="col-6" scope="row">
            {this.props.description}
          </th>
          <td className="col-3">
            {OddsFormater.americanOddSignage(this.props.boostedOdds)}
          </td>
          <td className="col-3" style={{ textDecoration: "line-through" }}>
            {OddsFormater.americanOddSignage(this.props.previousOdds)}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default BoostRow;
