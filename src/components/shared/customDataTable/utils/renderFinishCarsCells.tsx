import { TableCell } from "@mui/material";
import React from "react";
import {
  cardFinish,
  DeleteHandlerFinishCar,
} from "../../../../pages/CarFinish/types";
import { TFunction } from "i18next";
import UButton from "../../../ui/UButton/UButton";

const renderFinishCarsCells = (
  car: cardFinish,
  deleteHandler: DeleteHandlerFinishCar,
  t: TFunction<string, undefined>,
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
          <UButton
            onClick={(event) => deleteHandler?.(event, car)}
            text={t("buttons.delete")}
          />
        </div>
      </TableCell>
    </>
  );
};

export default renderFinishCarsCells;
