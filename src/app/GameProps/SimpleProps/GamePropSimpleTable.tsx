import React from "react";
import { Table } from "reactstrap";
import { theadProps } from "common/variables/headerNames";
import { GameProp } from "common/models/GameProp";
import PropRow from "./PropRow";
import AccordionTable from "common/components/Tables/AccordionTable/AccordionTable";

interface GamePropSimpleTableProps {
  propType: string;
  propsForPropType: GameProp[];
  searchTerm: string;
}

const GamePropSimpleTable = ({
  propType,
  propsForPropType,
  searchTerm,
}: GamePropSimpleTableProps) => {
  const renderGamePropRows = (props: GameProp[]) => {
    return props
      .sort(function (a, b) {
        return a.currentPayout - b.currentPayout;
      })
      .map((singleProp) => {
        if (singleProp.playerName.toLowerCase().includes(searchTerm)) {
          return <PropRow playerProp={singleProp} />;
        }
      });
  };

  return (
    <div>
      <AccordionTable
        headers={[propType].concat(theadProps)}
        widths={[60, 20, 20]}
      >
        {renderGamePropRows(propsForPropType)}
      </AccordionTable>
    </div>
  );
};

export default GamePropSimpleTable;
