import React, { useEffect, useState } from "react";
import { theadProps } from "common/variables/headerNames";
import { GameProp } from "common/models/GameProp";
import PropRow from "./PropRow";
import AccordionTable from "common/components/Tables/AccordionTable/AccordionTable";

interface GamePropSimpleTableProps {
  propType: string;
  propsForPropType: GameProp[];
  searchTerm: string;
  firstTable?: boolean;
}

const GamePropSimpleTable = ({
  propType,
  propsForPropType,
  searchTerm,
  firstTable,
}: GamePropSimpleTableProps) => {
  const [accordionOpen, setAccordionOpen] = useState(firstTable);
  useEffect(() => {
    if (searchTerm !== "") {
      setAccordionOpen(true);
    } else {
      setAccordionOpen(false);
    }
  });

  const renderGamePropRows = (props: GameProp[]) => {
    return props
      .sort(function (a, b) {
        return a.currentPayout - b.currentPayout;
      })
      .map((singleProp, i) => {
        if (singleProp.playerName.toLowerCase().includes(searchTerm)) {
          return <PropRow key={i} playerProp={singleProp} />;
        }
      });
  };

  return (
    <div>
      <AccordionTable
        headers={[propType].concat(theadProps)}
        widths={[60, 20, 20]}
        startOpen={accordionOpen}
      >
        {renderGamePropRows(propsForPropType)}
      </AccordionTable>
    </div>
  );
};

export default GamePropSimpleTable;
