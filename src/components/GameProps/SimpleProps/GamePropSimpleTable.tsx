import React from "react";
import { Table, FormGroup, Input } from "reactstrap";
import { theadProps } from "variables/general";
import { GameProp } from "common/models/GameProp";
import PropRow from "./PropRow";

interface GamePropSimpleTableProps {
  propType: string,
  propsForPropType:GameProp[],
  searchTerm:string
}

interface GamePropSimpleTableState {
}

class GamePropSimpleTable extends React.Component<GamePropSimpleTableProps,GamePropSimpleTableState> {
  

  render() {
    return (
      <div>
        <Table responsive>
          <thead className="text-primary">
            <tr className="d-flex">
              <th className="col-6">{this.props.propType}</th>
              {theadProps.map((head) => {
                return <th className="col-3">{head}</th>;
              })}
            </tr>
          </thead>
          <tbody className="boosts-striped">
            {this.renderGamePropRows(this.props.propsForPropType)}
          </tbody>
        </Table>
      </div>
    );
  }
  renderGamePropRows(props : GameProp[]) {
    return props
      .sort(function (a, b) {
        return a.currentPayout - b.currentPayout;
      })
      .map((singleProp) => {
        if (
          singleProp.playerName.toLowerCase().includes(this.props.searchTerm)
        ) {
          return <PropRow playerProp={singleProp} />;
        }
      });
  }
}

export default GamePropSimpleTable;
