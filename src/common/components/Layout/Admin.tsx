import React from "react";
import { Route, Switch } from "react-router-dom";
import { apiUrl } from "common/variables/constants";
import Login from "app/Login/Login";
import routes from "routes";
import { withOktaAuth } from "@okta/okta-react";
import GameSpecificProps from "app/GameProps/game-specific-props-component/GameSpecificProps";
import { Book } from "common/models/Book";
import MaterialMenu from "../MaterialMenu/MaterialMenu";
import { ThemeProvider } from "@material-ui/styles";
import mainTheme from "common/variables/theme";

interface DashboardProps {
  authService: any;
  authState: any;
  history: any;
  baseUrl: string;
}

interface DashboardState {
  userInfo: any;
  allBooks: Book[];
  checkedBooks: Book[];
  backgroundColor: string;
}
export default withOktaAuth(
  class Dashboard extends React.Component<DashboardProps, DashboardState> {
    constructor(props) {
      super(props);
      this.state = {
        backgroundColor: "black",
        allBooks: [],
        checkedBooks: [],
        userInfo: null,
      };
      this.setUserDefaults = this.setUserDefaults.bind(this);
      this.checkUser = this.checkUser.bind(this);
      this.checkUser();
    }

    componentDidMount() {
      fetch(apiUrl + "/gamblingsite")
        .then((res) => res.json())
        .then((data) => {
          var dataSorted = data.sort(function(a,b) {
            return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;
          } );
          var books = dataSorted.map((site) => {
            const container = {};

            container["value"] = site.name;
            container["label"] = site.name;

            return container;
          });
          this.setState({ allBooks: books });

          if (!this.state.userInfo) {
            this.setState({ checkedBooks: books });
          }
        });

      if (this.state.userInfo) {
        this.fetchUserDefaults();
      }
    }

    componentDidUpdate(_prevProps: DashboardProps, prevState: DashboardState) {
      this.checkUser();

      if (prevState.userInfo !== this.state.userInfo) {
        this.fetchUserDefaults();
      }
    }

    fetchUserDefaults() {
      const accessToken = this.props.authState.accessToken;
      fetch(apiUrl + "/settings", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
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
      var gamblingsites = JSON.stringify(
        this.state.checkedBooks.map(function (book) {
          return book["value"];
        })
      );
      console.log(gamblingsites);
      return fetch(apiUrl + "/settings", {
        method: "PUT",
        body: gamblingsites,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
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
          <ThemeProvider theme={mainTheme}>
            <MaterialMenu history={this.props.history}>
              <Switch>
                <Route
                  path="/login"
                  render={(props) => (
                    <Login baseUrl={this.props.baseUrl} {...props} />
                  )}
                />
                <Route
                  path="/sports/:sport/games/:gameId"
                  render={(props) => (
                    <GameSpecificProps
                      {...props}
                      isLoggedIn={this.props.authState.isAuthenticated}
                      setUserDefaults={this.setUserDefaults}
                      allBooks={this.state.allBooks}
                      checkedBooks={this.state.checkedBooks}
                      handleSportsbookChange={this.handleCheck}
                    />
                  )}
                />
                {routes.map((prop, key) => {
                  return (
                    <Route
                      path={prop.layout + prop.path}
                      render={() => (
                        <prop.component
                          {...prop}
                          isLoggedIn={this.props.authState.isAuthenticated}
                          setUserDefaults={this.setUserDefaults}
                          allBooks={this.state.allBooks}
                          checkedBooks={this.state.checkedBooks}
                          handleSportsbookChange={this.handleCheck}
                        />
                      )}
                      key={key}
                    />
                  );
                })}
              </Switch>
            </MaterialMenu>
          </ThemeProvider>
        </div>
      );
    }
  }
);
