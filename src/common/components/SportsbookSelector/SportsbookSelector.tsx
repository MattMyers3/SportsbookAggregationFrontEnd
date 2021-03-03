import React from "react";
import {
  FormControl,
  InputBase,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  createStyles,
  withStyles,
  Chip,
  Grid,
} from "@material-ui/core";
import { Book } from "common/models/Book";

const BootstrapInput = withStyles((theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      boxShadow: " 0px 2px 4px rgba(0,0,0,0.05)",
      minWidth: "100px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme) =>
  createStyles({
    margin: {
      marginBottom: theme.spacing(1),
    },
  })
);

interface SportsBookSelectorProps {
  allBooks: Book[];
  checkedBooks: Book[];
  handleSportsBookChange: Function;
}

const SportsBookSelector = ({
  allBooks,
  checkedBooks,
  handleSportsBookChange,
}: SportsBookSelectorProps) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const item = allBooks.filter(
      (book) => book.value === event.target.value
    )[0];
    if (item) {
      const newList = checkedBooks.concat([item]);
      handleSportsBookChange(newList);
    }
  };
  const handleDelete = (book: Book) => () => {
    const newList = checkedBooks.filter(
      (checkedBook) => checkedBook.value !== book.value
    );
    handleSportsBookChange(newList);
  };

  const getPlaceHolderText = () => {
    if (allBooks.length === checkedBooks.length) {
      return <em>All Sportsbooks Selected</em>;
    } else {
      return <em>Select a Sportsbook</em>;
    }
  };

  const generateOptions = () => {
    let unSelected = [] as Book[];
    for (const book of allBooks) {
      if (
        !checkedBooks.some((checkedBook) => book.value === checkedBook.value)
      ) {
        unSelected.push(book);
      }
    }
    return unSelected.map((unSelectedBook) => {
      return (
        <MenuItem value={unSelectedBook.value}>{unSelectedBook.label}</MenuItem>
      );
    });
  };

  return (
    <div>
      <Grid container direction="column" alignItems="flex-start">
        <Grid item>
          <FormControl className={classes.margin}>
            <InputLabel id="demo-customized-select-label">
              Add a Sportsbook
            </InputLabel>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              onChange={handleChange}
              input={<BootstrapInput />}
              value={"Add a SportsBook"}
            >
              <MenuItem disabled={true} value="Add a SportsBook">
                {getPlaceHolderText()}
              </MenuItem>
              {generateOptions()}
            </Select>
          </FormControl>
        </Grid>
        <Grid container item direction="row" spacing={1}>
          {checkedBooks.map((book) => {
            return (
              <Grid item>
                <Chip
                  label={book.value}
                  variant="outlined"
                  color="primary"
                  onDelete={handleDelete(book)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
};
export default SportsBookSelector;
