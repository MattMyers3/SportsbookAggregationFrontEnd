import React, {Component} from 'react';
import MainHeader from './Components/Header/MainHeader';
import SubHeader from './Components/Header/SubHeader';
import Main from './Components/Main';

    class App extends Component {
      state = {
        sports: ["NBA"],
        games: []
      }

      render () {
        return (
          <div>
            <MainHeader />
            <SubHeader />
            <Main />
          </div>          
        );
      }
    }

    export default App;


    

  
