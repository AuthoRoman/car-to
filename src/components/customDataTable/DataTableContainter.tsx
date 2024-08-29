import { Paper, TableContainer } from "@mui/material";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const DataTableContainer = (props: {
  children:
    | string
    | number
    | boolean
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined;
}) => (
  <TableContainer component={Paper} sx={{ width: "100%", margin: "0 auto" }}>
    {props.children}
  </TableContainer>
);

export default DataTableContainer;
