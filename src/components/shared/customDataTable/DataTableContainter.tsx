import { Paper, TableContainer } from "@mui/material";
import { ReactElement, JSXElementConstructor, ReactNode } from "react";

const DataTableContainer = (props: {
  children:
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | Iterable<ReactNode>;
}) => (
  <TableContainer component={Paper} sx={{ width: "100%", margin: "0 auto" }}>
    {props.children}
  </TableContainer>
);

export default DataTableContainer;
