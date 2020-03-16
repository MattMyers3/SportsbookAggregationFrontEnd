import React, {Component} from 'react';
import GameTableList from './Components/gameTableList';
import { apiUrl } from './Components/Constants';

    class App extends Component {
      state = {
        games: []
      }

      render () {
        return (
          <GameTableList games={this.state.games} />
        );
      }

      componentDidMount() {
        fetch(apiUrl + '/games?onlyFutureGames=true')
        .then(res => res.json()) 
        .then(data => this.setState({ games: data }))
      }
    }

    export default App;


    

  
