import {
  makeStyles,
  Theme,
  createStyles,
  InputBase,
  Paper,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "40px",
      borderRadius: "4px",
      border: "solid 1px #e4e4e4",
      boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
      display: "flex",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconStyle: {
      padding: "8px",
      height: "100%",
      width: "3rem",
      color: theme.palette.primary.dark,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

interface SearchBoxProps {
  handleSearch: Function;
  placeholder?: string;
}

const SearchBox = ({
  handleSearch,
  placeholder = "Search",
}: SearchBoxProps) => {
  const classes = useStyles();

  const handleChange = (event: any) => {
    const value = event.target.value;
    handleSearch(String(value));
  };
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        onChange={handleChange}
      />
      <SearchIcon className={classes.iconStyle} />
    </Paper>
  );
};
export default SearchBox;
