import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import OktaSignInWidget from "./OktaSignInWidget";
import { useOktaAuth } from "@okta/okta-react";
interface LoginProps {
  baseUrl: any;
}

  const Login = ({baseUrl}: LoginProps) => {
    const { authState, authService } = useOktaAuth();

    const onSuccess = (res) => {
      if (res.status === "SUCCESS") {
        return authService.redirect({
          sessionToken: res.session.token,
        });
      } else {
        console.log(res);
      }
    }

    const onError = (err) => {
      console.log("error logging in", err);
    }

      return authState.isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <OktaSignInWidget
          baseUrl={baseUrl}
          onSuccess={onSuccess}
          onError={onError}
          registration={true}
          redirectUri={"https://www.oddslibrary.com"}
        />
      );
    };

    export default Login;
