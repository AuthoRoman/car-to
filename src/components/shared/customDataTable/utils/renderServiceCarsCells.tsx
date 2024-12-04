import { TableCell } from "@mui/material";
import React from "react";
import {
  cardService,
  FunSetCurrentCar,
} from "../../../../pages/CarsService/types";
import { TFunction } from "i18next";
import UButton from "../../../ui/UButton/UButton";

const renderServiceCarsCells = (
  car: cardService,
  funSetCurrentCar: FunSetCurrentCar,
  t: TFunction<string, undefined>,
) => {
  return (
    <>
      <TableCell align="center">{car.nameMaster}</TableCell>
      <TableCell align="center">{car.manufacturer}</TableCell>
      <TableCell align="center">{car.modelYear}</TableCell>
      <TableCell align="center">{car.date ?? "Неизвестно"}</TableCell>
      <TableCell align="center">
        <div
          style={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            alignItems: " center",
          }}
        >
          <UButton
            onClick={(event) => funSetCurrentCar?.(event, car)}
            text={t("buttons.completeService")}
          />
        </div>
      </TableCell>
    </>
  );
};

export default renderServiceCarsCells;
