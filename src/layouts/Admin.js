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
import RegularTable from "views/TableList.js"
import { apiUrl } from "variables/constants.js";

import routes from "routes.js";

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: "black",
    allBooks: [],
    checkedBooks: []
  };
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
        this.setState({ checkedBooks: books, allBooks: books });
    });
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.mainPanel.current.scrollTop = 0;
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
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  render={(props) => <prop.component {...prop} allBooks={this.state.allBooks} checkedBooks={this.state.checkedBooks} handleSportsbookChange={this.handleCheck}/>}
                  key={key}
                />
              );
            })}
          </Switch>
        </div>
      </div>
    );
  }
}

export default Dashboard;
