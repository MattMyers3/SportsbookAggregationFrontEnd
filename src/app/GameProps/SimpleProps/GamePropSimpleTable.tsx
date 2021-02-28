import React from "react";
import { Table } from "reactstrap";
import { theadProps } from "common/variables/general";
import { GameProp } from "common/models/GameProp";
import PropRow from "./PropRow";

interface GamePropSimpleTableProps {
  propType: string;
  propsForPropType: GameProp[];
  searchTerm: string;
}

const GamePropSimpleTable = ({propType, propsForPropType, searchTerm}: GamePropSimpleTableProps) => {
  const renderGamePropRows = (props: GameProp[]) => {
    return props
      .sort(function (a, b) {
        return a.currentPayout - b.currentPayout;
      })
      .map((singleProp) => {
        if (
          singleProp.playerName.toLowerCase().includes(searchTerm)
        ) {
          return <PropRow playerProp={singleProp} />;
        }
      });
  }

  return (
    <div>
      <Table responsive>
        <thead className="text-primary">
          <tr className="d-flex">
            <th className="col-6">{propType}</th>
            {theadProps.map((head) => {
              return <th className="col-3">{head}</th>;
            })}
          </tr>
        </thead>
        <tbody className="boosts-striped">
          {renderGamePropRows(propsForPropType)}
        </tbody>
      </Table>
    </div>
  );
}

export default GamePropSimpleTable;
