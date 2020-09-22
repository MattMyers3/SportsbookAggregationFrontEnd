
import React from 'react'
import GameRow from './GameRow';
import { apiUrl } from './Constants';
import { Jumbotron } from 'react-bootstrap';

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
        {this.props.games.length === 0 ? this.renderNoGamesTodayMessage() :
          this.props.checkedBooks.length === 0 ? this.renderNoBooksCheckedMessage() : this.renderTable()}
      </div>
    )
  }   

  renderTable(){
      return <table className="table table-hover">
      <thead className="thead-dark">
        <tr>
            <th scope="col">Games</th>
            <th scope="col">Spread</th>
            <th scope="col">ML</th>
            <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        {this.props.games.map((game, i) => <GameRow key={game.gameId} homeTeamId={game.homeTeamId} awayTeamId={game.awayTeamId} gameId={game.gameId} checkedBooks={this.props.checkedBooks}/>)}
      </tbody>
    </table>
  }

  renderNoGamesTodayMessage(){
    return <Jumbotron> 
              <h1>No Games Today!</h1> 
              <p>Please use the calendar to select a new date</p>
          </Jumbotron>
  }

  renderNoBooksCheckedMessage(){
    return <Jumbotron> 
              <h1>No books!</h1> 
              <p>Please check at least one sportsbook in order to see the best available game lines.</p>
            </Jumbotron>

  }

   componentDidMount(){
     fetch(apiUrl + '/GameLines/LastRefreshTime')
         .then(res => res.json())
         .then(data => this.setState({ lastRefreshTime: new Date(data.lastRefreshTime)}))
   }
}

export default GameTableList;