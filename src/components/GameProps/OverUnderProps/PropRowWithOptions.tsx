import { GameProp } from "common/models/GameProp";
import React from "react";
interface PropRowWithOptionsProps {
  propList: any;
}

interface PropRowWithOptionsState {}
export class PropRowWithOptions extends React.Component<
  PropRowWithOptionsProps,
  PropRowWithOptionsState
> {
  render() {
    let under = this.props.propList.find(
      (prop) => prop.propDescription == "Under"
    );
    let over = this.props.propList.find(
      (prop) => prop.propDescription == "Over"
    );

    return (
      <React.Fragment>
        <tr className="d-flex">
          <td className="col-6" scope="row">
            {under.playerName}
          </td>
          <td className="col-3">
            <b>{under.propValue}</b>
            <sup>({under.currentPayout})</sup>
            <br></br>
            {under.currentSite}
          </td>
          <td className="col-3">
            <b>{over.propValue}</b>
            <sup>({over.currentPayout})</sup>
            <br></br>
            {over.currentSite}
          </td>
        </tr>
      </React.Fragment>
    );
  }
}
export default PropRowWithOptions;
