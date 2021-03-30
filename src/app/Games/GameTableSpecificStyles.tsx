import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
    color: "#000000",
    marginTop: "1rem",
    marginBottom: "-0.75rem"
  },
  subheading: {
    opacity: 0.7,
  },
  lastRefreshDesktop: {
    opacity: 0.7,
    textAlign: "right",
    marginBottom: "1rem",
  },
  refreshIcon: {
    opacity: 0.7,
  },
  lastRefreshMobile: {
    opacity: 0.7,
    marginBottom: "0.5rem"
  },
  iconColor: {
    color: theme.palette.primary.main,
  },
  selectSportsBook: {
    marginBottom: "-1rem",
  },
  tableContainer: {
    overflowY: "hidden",
  },
  card: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "-1rem",
      marginRight: "-1rem",
    },
  },
}));
export default useStyles;
