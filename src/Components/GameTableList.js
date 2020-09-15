import React from 'react'
import GameRow from './GameRow';
import { apiUrl } from './Constants';

class GameTableList extends React.Component{
  state = {
    lastRefreshTime: new Date(),
    startDate: new Date()
  }

  render()
  {
    return (
      <div className="mt-3">
        <small>Last Refresh Time: {(this.state.lastRefreshTime.getMonth() + 1) + '/' + this.state.lastRefreshTime.getDate() + '/' +
                                   this.state.lastRefreshTime.getFullYear() + ' ' + this.state.lastRefreshTime.getHours() + ':' +
                                   this.state.lastRefreshTime.getMinutes() + ':' + this.state.lastRefreshTime.getSeconds()}</small>
        <table className="table">
          <thead className="thead-dark">
            <tr>
                <th scope="col">Games</th>
                <th scope="col">Spread</th>
                <th scope="col">ML</th>
                <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {this.props.games.map((game, i) => <GameRow key={game.gameId} homeTeamId={game.homeTeamId} awayTeamId={game.awayTeamId} gameId={game.gameId}/>)}
          </tbody>
        </table>
      </div>
    )
  }   

   componentDidMount(){
     fetch(apiUrl + '/GameLines/LastRefreshTime?year=' + this.state.startDate.getFullYear() + '&month=' + (this.state.startDate.getMonth() + 1) + '&day=' + this.state.startDate.getDate())
         .then(res => res.json())
         .then(data => this.setState({ lastRefreshTime: new Date(data.lastRefreshTime)}))
   }
}

export default GameTableList;