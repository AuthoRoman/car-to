import { TableCell, Button } from "@mui/material";
import React from "react";
import {
  cardFinish,
  DeleteHandlerFinishCar,
} from "../../../pages/CarFinish/types";

const renderFinishCarsCells = (
  car: cardFinish,
  deleteHandler: DeleteHandlerFinishCar,
) => {
  return (
    <>
      <TableCell align="center" component="th" scope="row">
        {car.nameMaster}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {car.manufacturer}
      </TableCell>
      <TableCell align="center" component="th" scope="row">
        {car.modelYear}
      </TableCell>
      <TableCell align="center">
        {car.workOncar.trim().length === 0
          ? "Работа была проведена успешна"
          : car.workOncar}{" "}
      </TableCell>

      <TableCell align="center">
        <div
          style={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={(event) => deleteHandler?.(event, car)}
            sx={{
              backgroundColor: "var(--default-color-button)",
              transition: "var(--default-transition)",
              "&:hover": {
                background: "var(--default-color-button-hover)",
              },
            }}
            variant="contained"
          >
            Удалить
          </Button>
        </div>
      </TableCell>
    </>
  );
};

export default renderFinishCarsCells;
