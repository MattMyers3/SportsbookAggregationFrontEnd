
import React from 'react'
import GameRow from './GameRow';
import { apiUrl } from './Constants';

class GameTableList extends React.Component{
  state = {
    lastRefreshTime: new Date()
  }

  render()
  {
    return (
      <div className="mt-3">
        <small>Last Refresh Time: {(this.state.lastRefreshTime.getMonth() + 1) + '/' + this.state.lastRefreshTime.getDate() + '/' +
                                   this.state.lastRefreshTime.getFullYear() + ' ' + ('0'+this.state.lastRefreshTime.getHours()).slice(-2) + ':' +
                                   ('0'+this.state.lastRefreshTime.getMinutes()).slice(-2) + ':' + ('0'+this.state.lastRefreshTime.getSeconds()).slice(-2) + ' (EST)'} </small>
        <table className="table table-hover">
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
     fetch(apiUrl + '/GameLines/LastRefreshTime')
         .then(res => res.json())
         .then(data => this.setState({ lastRefreshTime: new Date(data.lastRefreshTime)}))
   }
}

export default GameTableList;