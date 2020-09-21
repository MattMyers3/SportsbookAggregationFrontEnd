import React, {Component} from 'react';
import MainHeader from './Components/Header/MainHeader';
import Main from './Components/Main';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

    class App extends Component {
      state = {
        sports: ["NBA"],
        games: []
      }

      render () {
        return (
          <Router>
            <div>
              <MainHeader />
              <Switch>
                <Route  path="/NBA" render={(props) => <Main sport={`NBA`} />} />
                <Route  path="/NFL" render={(props) => <Main sport={`NFL`} />} />
                <Route  path="/MLB" render={(props) => <Main sport={`MLB`} />} />
                <Route exact path="/" render={(props) => <Main sport={'NFL'} />} />
              </Switch>
            </div>
          </Router>          
        );
      }
    }

    export default App;


    

  
