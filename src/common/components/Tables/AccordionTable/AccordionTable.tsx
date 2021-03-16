import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  visible: {
    visibility: "visible",
  },
  collapsed: {
    visibility: "collapse",
  },
  header: {
    borderBottom: "1px solid rgba(224, 224, 224, 1);",
    borderTop: "1px solid rgba(224, 224, 224, 1);",
    cursor: "pointer",
  },
  headerMain: {
    color: theme.palette.primary.dark,
  },
  row: {
    backgroundColor: "#f3f3f3",
  },
  icon: {
    color: theme.palette.primary.dark,
  },
}));

interface AccordionTableProps {
  headers: string[];
  widths?: number[];
  children: React.ReactNode;
}

const AccordionTable = ({ headers, widths, children }: AccordionTableProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <Table>
      <colgroup>
        {widths?.map((w) => {
          return <col style={{ width: String(w) + "%" }}></col>;
        })}
      </colgroup>
      <TableHead>
        <TableRow
          className={classes.header}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <TableCell className={classes.headerMain}>
            {headers[0].toUpperCase()}
          </TableCell>
          {headers.slice(1).map((header) => {
            return <TableCell>{header.toUpperCase()}</TableCell>;
          })}
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <KeyboardArrowUpIcon className={classes.icon} />
              ) : (
                <KeyboardArrowDownIcon className={classes.icon} />
              )}
            </IconButton>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody
        className={clsx(open && classes.visible, !open && classes.collapsed)}
      >
        {children}
      </TableBody>
    </Table>
  );
};
export default AccordionTable;
