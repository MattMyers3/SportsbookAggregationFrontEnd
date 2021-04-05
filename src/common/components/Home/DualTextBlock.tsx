import React from 'react';
import { 
    Typography,
    makeStyles,
    Grid
 } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: "1rem",
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "2rem",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.25rem",
        }
    },

    textLeft: {

    },

    textRight: {

    }
}));

const DualTextBlock = ({
}) => {
  const classes = useStyles();

  return (
    <>
        <Typography className={classes.title}>Why Odds Library?</Typography>
        <Grid container direction="row" spacing={4} justify="center" alignItems="center">
            <Grid md={6}>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </Grid>
            <Grid md={6}>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Typography>
            </Grid>
        </Grid>
    </>
  );
}

export default DualTextBlock;