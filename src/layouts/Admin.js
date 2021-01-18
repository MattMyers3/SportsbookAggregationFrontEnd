/*!

=========================================================
* Now UI Dashboard React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Route, Switch, Redirect } from "react-router-dom";

// core components
import DemoNavbar from "components/Navbars/DemoNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import { apiUrl } from "variables/constants.js";
import Login from "components/Login.js";
import routes from "routes.js";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { withOktaAuth } from '@okta/okta-react';
import GameSpecificProps from "views/GameSpecificProps.js";

var ps;

export default withOktaAuth(class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "black",
      allBooks: [],
      checkedBooks: [],
      userInfo: null
    };
    this.setUserDefaults = this.setUserDefaults.bind(this);    
    this.checkUser = this.checkUser.bind(this);
    this.checkUser();
  }
  mainPanel = React.createRef();

  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }

    fetch(apiUrl + "/gamblingsite")
    .then((res) => res.json())
    .then((data) => {
        var books = data.map((site) => {
        const container = {};

        container["value"] = site.name;
        container["label"] = site.name;

        return container;
        });
        this.setState({allBooks: books });

        if(!this.state.userInfo) {
          this.setState({checkedBooks: books});
        }
    });
 
    if(this.state.userInfo){
      this.fetchUserDefaults();
    }
  }

  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this.checkUser();

    if(prevState.userInfo != this.state.userInfo){
      this.fetchUserDefaults();
    }

    if (prevProps.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
    }
  }

  fetchUserDefaults() {
    const accessToken = this.props.authState.accessToken;
    fetch(apiUrl + "/settings", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
        var books = data.map((site) => {
        const container = {};

        container["value"] = site.name;
        container["label"] = site.name;

        return container;
        });
        this.setState({ checkedBooks: books });
    });
  }

  setUserDefaults() {
    const accessToken = this.props.authState.accessToken; 
    var gamblingsites = JSON.stringify(this.state.checkedBooks.map(function(book) {
      return book["value"];
    }))
    console.log(gamblingsites)   ;
    return fetch(apiUrl + "/settings", {
        method: 'PUT',
        body: gamblingsites,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': "application/json"
        }
    })
  }

  checkUser() {
    if (this.props.authState.isAuthenticated && !this.state.userInfo) {
      const userInfo = this.props.authService.getUser();
      this.setState({ userInfo });
    }
  }

  handleColorClick = (color) => {
    this.setState({ backgroundColor: color });
  };

  handleCheck = (books) => {
    this.setState({
      checkedBooks: books,
    });
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
        />
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <PanelHeader size="sm" history={this.props.history}/>
          <Switch>
            <Route path="/login" render={(props) => <Login baseUrl={this.props.baseUrl} {...props}/>} />
            <Route path="/sports/:sport/games/:gameId" render={(props) => <GameSpecificProps {...props} isLoggedIn={this.props.authState.isAuthenticated} setUserDefaults={this.setUserDefaults} allBooks={this.state.allBooks} checkedBooks={this.state.checkedBooks} handleSportsbookChange={this.handleCheck}/>} />          
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  render={(props) => <prop.component {...prop} isLoggedIn={this.props.authState.isAuthenticated} setUserDefaults={this.setUserDefaults} allBooks={this.state.allBooks} checkedBooks={this.state.checkedBooks} handleSportsbookChange={this.handleCheck}/>}
                  key={key}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    );
  }
})

