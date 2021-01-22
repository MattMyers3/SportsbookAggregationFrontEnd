import React from "react";
import { Table } from "reactstrap";
import fuzz from "fuzzball";
import { theadPropsOverUnder } from "variables/general";
import PropRowWithOptions from "components/GameProps/OverUnderProps/PropRowWithOptions";


class GamePropTableWithOptions extends React.Component {
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
  renderGamePropRowsOverUnder(props) {
    let propsGroupedByName = this.groupBy(props, "playerName");
    return propsGroupedByName.map((props) => {
      if (
        props.groupList[0].playerName.toLowerCase().includes(this.props.searchTerm)
      )
      return <PropRowWithOptions propList={props.groupList} />;
    });
  }

  groupBy(props, field) {
    let groupedArr = [];
    props.forEach(function (e) {
      //look for an existent group
      let group = groupedArr.find((g) => fuzz.ratio(g["field"], e[field]) > 76);
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
