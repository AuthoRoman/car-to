import { TableCell } from "@mui/material";
import React, { memo } from "react";
import styles from "./TableCellWithSort.module.css";

interface ITableCellProps {
  title: string;
  state: boolean;
  arrowState: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const TableCellWithSort: React.FC<ITableCellProps> = memo(
  ({ state, arrowState, title, onClick }) => {
    return (
      <TableCell
        onClick={onClick}
        sx={{ "&:hover": { cursor: "pointer" } }}
        align="center"
      >
        <span className={styles.preIconText}> {title}</span>
        {/*Todo: очень плохо исполльзовать вложенные тернарники*/}
        {state ? (
          arrowState ? (
            <img
              className={styles.preIcon}
              width="14"
              height="14"
              src="https://img.icons8.com/ios-filled/50/down--v1.png"
              alt="down"
            />
          ) : (
            <img
              className={styles.preIcon}
              width="14"
              height="14"
              src="https://img.icons8.com/material-two-tone/24/up.png"
              alt="up"
            />
          )
        ) : arrowState ? (
          <img
            width="14"
            height="14"
            src="https://img.icons8.com/material-two-tone/24/up.png"
            alt="up"
          />
        ) : (
          <img
            width="14"
            height="14"
            src="https://img.icons8.com/ios-filled/50/down--v1.png"
            alt="down"
          />
        )}
      </TableCell>
    );
  },
);

export default TableCellWithSort;
