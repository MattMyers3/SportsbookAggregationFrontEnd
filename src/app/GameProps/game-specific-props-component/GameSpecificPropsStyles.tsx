import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: "1.5rem",
    color: "#000000",
    marginTop: "1rem",
  },
  subheading: {
    marginBottom: "0.5rem",
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
}));
export default useStyles;
