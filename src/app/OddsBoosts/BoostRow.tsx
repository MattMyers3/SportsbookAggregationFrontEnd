import React from "react";
import OddsFormater from "common/services/odds-formater";
interface BoostRowProps {
  description: string;
  boostedOdds: number;
  previousOdds: number;
}

const BoostRow = ({description, boostedOdds, previousOdds} : BoostRowProps) => {
  return (
    <React.Fragment>
        <tr className="d-flex">
          <th className="col-6" scope="row">
            {description}
          </th>
          <td className="col-3">
            {OddsFormater.americanOddSignage(boostedOdds)}
          </td>
          <td className="col-3" style={{ textDecoration: "line-through" }}>
            {OddsFormater.americanOddSignage(previousOdds)}
          </td>
        </tr>
      </React.Fragment>
  );
}

export default BoostRow;
