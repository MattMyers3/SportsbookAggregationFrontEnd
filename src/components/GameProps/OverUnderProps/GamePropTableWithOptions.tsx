import React from "react";
import { Table } from "reactstrap";
import { theadPropsOverUnder } from "common/variables/general";
import PropRowWithOptions from "components/GameProps/OverUnderProps/PropRowWithOptions";
interface GamePropTableWithOptionsProps {
  propType: any;
  propsForPropType: any;
  searchTerm: String;
}

interface GamePropTableWithOptionsState {}

class GamePropTableWithOptions extends React.Component<
  GamePropTableWithOptionsProps,
  GamePropTableWithOptionsState
> {
  render() {
    return (
      <div>
        <Table responsive>
          <thead className="text-primary">
            <tr className="d-flex">
              <th className="col-6">{this.props.propType}</th>
              {theadPropsOverUnder.map((head) => {
                return <th className="col-3">{head}</th>;
              })}
            </tr>
          </thead>
          <tbody className="boosts-striped">
            {this.renderGamePropRowsOverUnder(this.props.propsForPropType)}
          </tbody>
        </Table>
      </div>
    );
  }
  renderGamePropRowsOverUnder(props: any) {
    let propsGroupedByName = this.groupBy(props, "playerName");
    return propsGroupedByName.map((props) => {
      return <PropRowWithOptions propList={props.groupList} />;
    });
  }

  groupBy(props, field) {
    let groupedArr = [] as any;
    props.forEach(function (e) {
      //look for an existent group
      let group = groupedArr.find((g) => g["field"] === e[field]);
      if (group == undefined) {
        //add new group if it doesn't exist
        group = { field: e[field], groupList: [] };
        groupedArr.push(group);
      }

      //add the element to the group
      group.groupList.push(e);
    });

    return groupedArr;
  }
}

export default GamePropTableWithOptions;
