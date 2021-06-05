import React, { useEffect, useState } from "react";
import { theadPropsOverUnder } from "common/variables/headerNames";
import fuzz from "fuzzball";
import PropRowWithOptions from "app/GameProps/OverUnderProps/PropRowWithOptions";
import AccordionTable from "common/components/Tables/AccordionTable/AccordionTable";
import { GameProp } from "common/models/GameProp";

interface GamePropTableWithOptionsProps {
  propType: string;
  propsForPropType: GameProp[];
  searchTerm: string;
  firstTable?: boolean;
}

const GamePropTableWithOptions = ({
  propType,
  propsForPropType,
  searchTerm,
  firstTable,
}: GamePropTableWithOptionsProps) => {
  const [accordionOpen, setAccordionOpen] = useState(firstTable);
  useEffect(() => {
    if (searchTerm !== "") {
      setAccordionOpen(true);
    } else {
      setAccordionOpen(false);
    }
  });
  const groupBy = (props, field) => {
    let groupedArr = [] as any;
    props.forEach(function (e) {
      //look for an existent group
      let group = groupedArr.find((g) => fuzz.ratio(g["field"], e[field]) > 79);
      if (!group) {
        //add new group if it doesn't exist
        group = { field: e[field], groupList: [] };
        groupedArr.push(group);
      }

      //add the element to the group
      group.groupList.push(e);
    });
    return groupedArr;
  };

  const renderGamePropRowsOverUnder = (props: any) => {
    let propsGroupedByName = groupBy(props, "playerName");
    return propsGroupedByName.map((props, i) => {
      if (props.groupList[0].playerName.toLowerCase().includes(searchTerm))
        return <PropRowWithOptions key={i} propList={props.groupList} />;
    });
  };

  return (
    <div>
      <AccordionTable
        headers={[propType].concat(theadPropsOverUnder)}
        widths={[60, 20, 20]}
        startOpen={accordionOpen}
      >
        {renderGamePropRowsOverUnder(propsForPropType)}
      </AccordionTable>
    </div>
  );
};

export default GamePropTableWithOptions;
