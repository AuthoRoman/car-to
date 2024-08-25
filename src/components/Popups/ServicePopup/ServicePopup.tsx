import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useTypedDispatch } from "../../../state/hooks/hooks";

import decodeVIN from "../../../api/VIN/VinAPI";
import { addData } from "../../../api/database/db";

import styles from "./ServicePopup.module.scss";
import { addServiceCar } from "../../../state/reducers/ServiceCarSlice";
import { TypeBases } from "../../../state/types";

const ServicePopup: React.FC<{
  closeVisible: (parampopup: boolean) => void;
  VIN: string;
  problems: string;
  closeWithNextStadyCar: () => void;
}> = ({ closeVisible, VIN, problems, closeWithNextStadyCar }) => {
  const dispatch = useTypedDispatch();
  const randomIdKey = Math.random() * 100;
  const [nameMaster, setNameMaster] = useState("");

  async function submitForm(VIN: string, name: string, problems: string) {
    const currentDate = new Date();
    const date = `${
      currentDate.getDate() < 10
        ? "0" + currentDate.getDate()
        : currentDate.getDate()
    }.${
      currentDate.getMonth() < 10
        ? "0" + (currentDate.getMonth() + 1)
        : currentDate.getMonth()
    }.${currentDate.getFullYear()}`;
    const data = await decodeVIN(VIN);

    if (data) {
      const thisCar = {
        id: randomIdKey,
        VIN: VIN,
        region: data.region,
        country: data.country,
        date: date,
        manufacturer: data.manufacturer,
        vehicleAttributes: data.vehicleAttributes,
        checkDigit: data.checkDigit,
        modelYear: data.modelYear,
        assemblyPlant: data.assemblyPlant,
        serialNumber: data.serialNumber,
        nameMaster: name,
        problems: problems,
      };

      await addData(TypeBases.CARS_IN_SERVICE, thisCar);
      await dispatch(addServiceCar(thisCar));
      closeWithNextStadyCar();
    }
    if (!data) {
      console.log("no data");
    }
  }

  return (
    <div>
      <div className={styles.createCardPopup}>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
          className={styles.form}
          action=""
        >
          <h1>Имя мастера взявшего автомобиль на обслуживание</h1>

          <TextField
            value={nameMaster}
            onChange={(e) => setNameMaster(e.target.value)}
            sx={{
              borderRadius: "5px",
              backgroundColor: "white",
            }}
            className={styles.inputPhoneCustom}
            placeholder="Имя"
            color="primary"
          />

          <div className={styles.form__footer}>
            <Button
              onClick={() => closeVisible(false)}
              sx={{
                color: "var(--default-color-button)",
              }}
            >
              Отмена
            </Button>
            <Button
              disabled={!nameMaster.trim().length}
              onClick={() =>
                submitForm(VIN, nameMaster, problems ? problems : "")
              }
              sx={{
                backgroundColor: "var(--default-color-button)",
                transition: "var(--default-transition)",
                "&:hover": {
                  background: "var(--default-color-button-hover)",
                },
              }}
              variant="contained"
            >
              Отправить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicePopup;
