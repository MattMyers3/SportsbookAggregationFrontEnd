import React, { useEffect, useState } from "react";
import { withOktaAuth } from "@okta/okta-react";
import { Button, makeStyles, withStyles } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  loginButton: {
    backgroundColor: "linear-gradient(225deg, #39B54A, #39B54A, #006838)",
  },
}));

const ToLoginButton = withStyles((theme) => ({
  root: {
    background: "linear-gradient(136deg, #FFD047, #FFB347)",
    "&:hover": {
      background: "linear-gradient(136deg, #FFD047, #FFB347)",
    },
  },
}))(Button);

interface LoginButtonProps {
  authState: any;
  authService: any;
  history: any;
}

const LoginButton = ({ authState, authService, history }: LoginButtonProps) => {
  const classes = useStyles();
  const [_isMounted, setIsMounted] = useState(false);
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    setIsMounted(true);
    checkUser();
    return () => {
      setIsMounted(false);
    };
  });

  const login = async () => {
    history.push("/login");
  };

  const logout = async () => {
    authService.logout("/");
  };
  const checkUser = async () => {
    if (authState.isAuthenticated && !userInfo) {
      const userInfo = await authService.getUser();
      if (_isMounted) {
        setUserInfo(userInfo);
      }
    }
  };

  const GetLoginDisplay = () => {
    if (userInfo && userInfo.name) {
      return (
        <Button onClick={logout}>
          <AccountCircle /> {userInfo.name}
        </Button>
      );
    }
    if (authState.isPending) {
      return <div>Loading authentication...</div>;
    } else if (!authState.isAuthenticated) {
      return (
        <div>
          <ToLoginButton onClick={login}>
            {" "}
            <AccountCircle /> Login
          </ToLoginButton>
        </div>
      );
    }
  };

  return <div>{GetLoginDisplay()}</div>;
};
export default withOktaAuth(LoginButton);
