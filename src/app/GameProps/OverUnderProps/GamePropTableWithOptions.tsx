import React from "react";
import { theadPropsOverUnder } from "common/variables/headerNames";
import fuzz from "fuzzball";
import PropRowWithOptions from "app/GameProps/OverUnderProps/PropRowWithOptions";
import AccordionTable from "common/components/Tables/AccordionTable/AccordionTable";

interface GamePropTableWithOptionsProps {
  propType: any;
  propsForPropType: any;
  searchTerm: String;
}

const GamePropTableWithOptions = ({
  propType,
  propsForPropType,
  searchTerm,
}: GamePropTableWithOptionsProps) => {
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
      >
        {renderGamePropRowsOverUnder(propsForPropType)}
      </AccordionTable>
    </div>
  );
};

export default GamePropTableWithOptions;
