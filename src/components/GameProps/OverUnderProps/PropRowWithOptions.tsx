import { GameProp } from "common/models/GameProp";
import React from "react";
interface PropRowWithOptionsProps {
  propList: GameProp[];
}

interface PropRowWithOptionsState {}
export class PropRowWithOptions extends React.Component<
  PropRowWithOptionsProps,
  PropRowWithOptionsState
> {
  render() {
    let under = this.props.propList.find(
      (prop) => prop.propDescription === "Under"
    );
    let over = this.props.propList.find(
      (prop) => prop.propDescription === "Over"
    );
    let style = {};
    if (under && over) {
      if (over.currentPayout + under.currentPayout > 0)
        style = { backgroundColor: "lightgreen" };
      return (
        <React.Fragment>
          <tr className="d-flex" style={style}>
            <td className="col-6" scope="row">
              {under.playerName}
            </td>

            <td className="col-3">
              <b>{over.propValue}</b>
              <sup>({over.currentPayout})</sup>
              <br></br>
              {over.currentSite}
            </td>
            <td className="col-3">
              <b>{under.propValue}</b>
              <sup>({under.currentPayout})</sup>
              <br></br>
              {under.currentSite}
            </td>
          </tr>
        </React.Fragment>
      );
    }
  }
}
export default PropRowWithOptions;
