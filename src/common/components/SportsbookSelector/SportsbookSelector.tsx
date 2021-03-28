import React from "react";
import {
  FormControl,
  InputBase,
  makeStyles,
  createStyles,
  withStyles,
  Chip,
  Grid,
  NativeSelect,
} from "@material-ui/core";
import { Book } from "common/models/Book";
import { ExpandMore } from "@material-ui/icons";

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
      border: "1px solid #e4e4e4",
      fontSize: "1rem",
      color: "#ababab",
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
    chipOrganization: {
      [theme.breakpoints.down("sm")]: {
        overflow: "auto",
        flexWrap: "nowrap",
        paddingBottom: "0.5rem",
      },
    },
    dropdownIcon: {
      color: theme.palette.primary.dark,
    },
    optionFont: {
      color: "#000000",
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
      return "All Sportsbooks Selected";
    } else {
      return "Select a Sportsbook";
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
    return unSelected.map((unSelectedBook, i) => {
      return (
        <option key={i} className={classes.optionFont} value={unSelectedBook.value}>
          {unSelectedBook.label}
        </option>
      );
    });
  };

  const coloredExpandMore = (props) => {
    return (
      <ExpandMore
        className={props.className + " " + classes.dropdownIcon}
      ></ExpandMore>
    );
  };

  return (
    <div>
      <Grid container direction="column" alignItems="flex-start">
        <Grid>
          <FormControl className={classes.margin}>
            <NativeSelect
              id="demo-customized-select"
              onChange={handleChange}
              input={<BootstrapInput />}
              value={"1"}
              fullWidth
              IconComponent={coloredExpandMore}
            >
              <option disabled={true} value="1">
                {getPlaceHolderText()}
              </option>
              {generateOptions()}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid
          container
          item
          direction="row"
          spacing={1}
          className={classes.chipOrganization}
        >
          {checkedBooks.map((book, i) => {
            return (
              <Grid item key={i}>
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
