import React from "react";
import { TableCell, Button } from "@mui/material";
import {
  DeleteButtonCarHandler,
  ICar,
  NextHandlerPop,
} from "../../../../pages/CarsWaitings/types";
import { TFunction } from "i18next";

const renderWaitingsCarTableRow = (
  car: ICar,
  deleteCar: DeleteButtonCarHandler,
  handleServicePop: NextHandlerPop,
  t: TFunction<string, undefined>,
) => {
  return (
    <>
      <TableCell align="center" component="th" scope="row">
        {car.firstNameOwner} {car.secondNameOwner}
      </TableCell>
      <TableCell align="center">{car.email}</TableCell>
      <TableCell align="center">{car.carNumber}</TableCell>
      <TableCell align="center">{car.date}</TableCell>
      <TableCell align="center">
        <div
          style={{
            display: "flex",
            gap: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button onClick={(event) => deleteCar?.(event, car)} color="warning">
            {`${t("buttons.delete")}`}
          </Button>
          <Button
            onClick={(event) => handleServicePop?.(event, car.VIN, car)}
            sx={{
              backgroundColor: "var(--default-color-button)",
              transition: "var(--default-transition)",
              "&:hover": {
                background: "var(--default-color-button-hover)",
              },
            }}
            variant="contained"
          >
            {`${t("buttons.sendService")}`}
          </Button>
        </div>
      </TableCell>
    </>
  );
};

export default renderWaitingsCarTableRow;
