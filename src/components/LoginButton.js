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
import { withOktaAuth } from '@okta/okta-react';
import { Button } from "react-bootstrap";

async function checkUser() {
    if (this.props.authState.isAuthenticated && !this.state.userInfo) {
      const userInfo = await this.props.authService.getUser();
      if (this._isMounted) {
        this.setState({ userInfo });
      }
    }
  }

export default withOktaAuth(class LoginButton extends React.Component {
    _isMounted = false;

  constructor(props) {
    super(props);
    this.state = { userInfo: null };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.checkUser = checkUser.bind(this);
  }

  async login() {
    this.props.history.push('/login');
  }

  async logout() {
    this.props.authService.logout('/');
  }

  async componentDidMount() {
    this._isMounted = true;
    this.checkUser();
  }

  async componentDidUpdate() {
    this._isMounted = true;
    this.checkUser();
  }

  async componentWillUnmount() {
    this._isMounted = false;
  }

  GetLoginDisplay() {
    if(this.state.userInfo != null) {
      return (
        <Button variant="secondary" onClick={this.logout} active><i className={"now-ui-icons users_circle-08"} /> {this.state.userInfo.name}</Button>
      )
    }
    if(this.props.authState.isPending) {
      return (
        <div>Loading authentication...</div>
      );
    } else if( !this.props.authState.isAuthenticated ) {
      return (
        <div>
         <Button variant="secondary" onClick={this.login} active> <i className={"now-ui-icons users_single-02"} /> Login</Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.GetLoginDisplay()}  
      </div>
    );
  }
})