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
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import { Security, LoginCallback } from "@okta/okta-react";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/now-ui-dashboard.scss?v1.4.0";
import "assets/css/demo.css";

import AdminLayout from "layouts/Admin.js";
import Login from "components/Login.js";

const hist = createBrowserHistory();

ReactGA.initialize("UA-178359906-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const config = {
  clientId: "0oa19xhlo9NYrl4tP5d6",
  issuer: "https://dev-5862712.okta.com/oauth2/default",
  redirectUri: "https://www.oddslibrary.com/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

ReactDOM.render(
  <Router history={hist}>
    <Security {...config}>
      <Switch>
        <Route
          path="/sports/:sport/games/:gameId"
          render={(props) => <AdminLayout history={hist} {...props} />}
        />
        <Route
          path="/sports"
          render={(props) => <AdminLayout history={hist} {...props} />}
        />
        <Route path="/info" render={(props) => <AdminLayout {...props} />} />
        <Route
          path="/oddsboosts"
          render={(props) => <AdminLayout {...props} />}
        />
        <Route path="/login/callback" component={LoginCallback} />
        <Route
          path="/login"
          render={(props) => (
            <AdminLayout baseUrl="https://dev-5862712.okta.com" {...props} />
          )}
        />
        <Redirect to="/sports/nfl" />
      </Switch>
    </Security>
  </Router>,
  document.getElementById("root")
);
