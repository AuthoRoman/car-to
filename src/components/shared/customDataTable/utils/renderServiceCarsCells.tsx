import { TableCell, Button } from "@mui/material";
import React from "react";
import {
  cardService,
  FunSetCurrentCar,
} from "../../../../pages/CarsService/types";
import { TFunction } from "i18next";

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
          <Button
            onClick={(event) => funSetCurrentCar?.(event, car)}
            sx={{
              backgroundColor: "var(--default-color-button)",
              transition: "var(--default-transition)",
              "&:hover": {
                background: "var(--default-color-button-hover)",
              },
            }}
            variant="contained"
          >
            {t("buttons.completeService")}
          </Button>
        </div>
      </TableCell>
    </>
  );
};

export default renderServiceCarsCells;
