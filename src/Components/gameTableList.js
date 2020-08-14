import React from 'react'
import GameRow from './GameRow';

    const GameTableList = ({ games }) => {
        return (
            <div className="mt-3">
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
                  {games.map((game, i) => <GameRow key={game.gameId} homeTeamId={game.homeTeamId} awayTeamId={game.awayTeamId} gameId={game.gameId}/>)}
                </tbody>
              </table>
            </div>
          )
    };

    export default GameTableList;