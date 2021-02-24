import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import dashRoutes from "routes";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginButton from "../LoginButton/LoginButton";
import useStylesMenu from "./MaterialMenuStyles";

export default function MaterialMenu({ children, ...props }) {
  const classes = useStylesMenu();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Odds Library
          </Typography>
          <LoginButton history={props.history}></LoginButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {dashRoutes.map((route) => {
            const routePath = route.layout + route.path;
            const isCurrentPath = props.history.location.pathname === routePath;
            return (
              <ListItem
                button
                component={Link}
                to={route.layout + route.path}
                className={clsx(isCurrentPath && classes.optionIsSelected)}
              >
                <ListItemIcon>
                  <FontAwesomeIcon
                    icon={route.icon}
                    size="2x"
                    className={clsx(
                      isCurrentPath && classes.blackText,
                      !isCurrentPath && classes.whiteText
                    )}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={route.name}
                  className={clsx(
                    isCurrentPath && classes.blackText,
                    !isCurrentPath && classes.whiteText
                  )}
                ></ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
}
