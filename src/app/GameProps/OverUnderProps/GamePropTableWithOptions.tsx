import React from "react";
import { Table } from "reactstrap";
import { theadPropsOverUnder } from "common/variables/headerNames";
import fuzz from "fuzzball";
import PropRowWithOptions from "app/GameProps/OverUnderProps/PropRowWithOptions";

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
    return propsGroupedByName.map((props) => {
      if (props.groupList[0].playerName.toLowerCase().includes(searchTerm))
        return <PropRowWithOptions propList={props.groupList} />;
    });
  };

  return (
    <div>
      <Table responsive>
        <thead className="text-primary">
          <tr className="d-flex">
            <th className="col-6">{propType}</th>
            {theadPropsOverUnder.map((head) => {
              return <th className="col-3">{head}</th>;
            })}
          </tr>
        </thead>
        <tbody className="boosts-striped">
          {renderGamePropRowsOverUnder(propsForPropType)}
        </tbody>
      </Table>
    </div>
  );
};

export default GamePropTableWithOptions;
