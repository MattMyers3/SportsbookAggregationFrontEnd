import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import ReactGA from "react-ga";
import { Security, LoginCallback } from "@okta/okta-react";
import AdminLayout from "common/components/Layout/Admin";
import { config } from "common/variables/constants";
import Home from "common/components/Home/Home";

const hist = createBrowserHistory();

ReactGA.initialize("UA-178359906-1");
ReactGA.pageview(window.location.pathname + window.location.search);

const oktaConfig = {
  clientId: "0oa19xhlo9NYrl4tP5d6",
  issuer: "https://dev-5862712.okta.com/oauth2/default",
  redirectUri: config.redirectUrl,
  scopes: ["openid", "profile", "email"],
  pkce: true,
};

ReactDOM.render(
  <Router history={hist}>
    <Security {...oktaConfig}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
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
        <Redirect to="/" />
      </Switch>
    </Security>
  </Router>,
  document.getElementById("root")
);
