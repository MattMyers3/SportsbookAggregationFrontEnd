import React from 'react';
import {
    AppBar,
    Typography,
    makeStyles,
    Button,
    Toolbar,
    IconButton,
    createStyles,
    withStyles,
  } from "@material-ui/core";
  import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      background: 'linear-gradient(225deg, #39B54A, #39B54A, #006838)'
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      [theme.breakpoints.down("sm")]: {
        fontSize: '1.25rem'
      }
    },
}));

const SignUpButton = withStyles((theme) =>
  createStyles({
    root: {
      background: 'linear-gradient(224deg, #FFD047, #FFB347)',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      '&:hover': {
        color: 'black'
      },
      whiteSpace: 'nowrap',
      [theme.breakpoints.down("sm")]: {
        fontSize: '0.675rem'
      },
    }
  }),
)(Button);

const LoginButton = withStyles((theme) =>
  createStyles({
    root: {
      textTransform: 'uppercase',
      border: 'solid 1px #ffffff',
      marginRight: '1rem',
      fontWeight: 'bold',
      '&:hover': {
        color: "primary"
      },
      whiteSpace: 'nowrap',
      [theme.breakpoints.down("sm")]: {
        fontSize: '0.675rem',
        marginRight: '0.5rem'
      },
    }
  }),
)(Button);

const HomeNavMenu = ({
  }) => {
    const classes = useStyles();

    return (
      <AppBar className={classes.root} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="secondary" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h5"
            color="secondary"
            noWrap
            className={classes.title}
            >
            Odds Library
          </Typography>
          <LoginButton>
            <Typography color="secondary">
              Login
            </Typography>
          </LoginButton>
          <SignUpButton>Sign Up</SignUpButton>          
        </Toolbar>
      </AppBar>
    );
  }

export default HomeNavMenu;