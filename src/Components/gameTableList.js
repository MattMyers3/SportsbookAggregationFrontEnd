import React from 'react'
import GameRow from './gameRow';

    const GameTableList = ({ games }) => {
        return (
            <div>
              <center><h1>Games</h1></center>
              {games.map((game, i) => (
                <table key={i} className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Team Name</th>
                      <th scope="col">Spread</th>
                      <th scope="col">ML</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <GameRow homeTeamId={game.homeTeamId} awayTeamId={game.awayTeamId} gameId={game.gameId}/>
                  </tbody>
                </table>
              ))}
            </div>
          )
    };

    export default GameTableList;