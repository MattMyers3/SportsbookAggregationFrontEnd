import {
  IconButton,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import {
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  visible: {
    visibility: "visible",
  },
  collapsed: {
    visibility: "collapse",
    display: "none",
  },
  headerRow: {
    borderBottom: "1px solid rgba(224, 224, 224, 1);",
    borderTop: "1px solid rgba(224, 224, 224, 1);",
    cursor: "pointer",
  },
  headerHidden: {
    visibility: "hidden",
  },
  headerMain: {
    color: theme.palette.primary.dark,
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.775rem",
    },
  },
  headerSecondary: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.675rem",
    },
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
  startOpen?: boolean;
}

const AccordionTable = ({
  headers,
  widths,
  children,
  startOpen,
}: AccordionTableProps) => {
  const classes = useStyles();
  const [open, setOpen] = useState(startOpen);

  useEffect(() => {
    if (startOpen) {
      setOpen(startOpen);
    }
  }, [startOpen]);

  return (
    <Table>
      <colgroup>
        {widths?.map((w, i) => {
          return <col key={i} style={{ width: String(w) + "%" }}></col>;
        })}
      </colgroup>
      <TableHead>
        <TableRow
          className={classes.headerRow}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <TableCell className={classes.headerMain}>
            {headers[0].toUpperCase()}
          </TableCell>
          {headers.slice(1).map((header, i) => {
            if (!open) {
              return <TableCell />;
            }
            return (
              <TableCell key={i} className={classes.headerSecondary}>
                {header.toUpperCase()}
              </TableCell>
            );
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
