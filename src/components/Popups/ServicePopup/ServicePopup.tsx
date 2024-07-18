import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useTypedDispatch } from "../../../state/hooks/hooks";
import { serviceCarTypesAction, TypeBases } from "../../../state/types";
import decodeVIN from "../../../api/VIN/VinAPI";
import { addData } from "../../../api/database/db";

import styles from "./ServicePopup.module.scss";

const ServicePopup: React.FC<{
  closeVisible: any;
  VIN: string;
  problems: string;
  closeWithNextStadyCar: any;
}> = ({ closeVisible, VIN, problems, closeWithNextStadyCar }) => {
  const dispatch = useTypedDispatch();
  const randomIdKey = Math.random() * 100;
  const [nameMaster, setNameMaster] = useState("");

  async function submitForm(VIN: any, name: string, problems: string) {
    let currentDate = new Date();
    const date = `${
      currentDate.getDate() < 10
        ? "0" + currentDate.getDate()
        : currentDate.getDate()
    }.${
      currentDate.getMonth() < 10
        ? "0" + (currentDate.getMonth() + 1)
        : currentDate.getMonth()
    }.${currentDate.getFullYear()}`;
    console.log("OUR VIN IS: " + VIN);
    const data = await decodeVIN(VIN);
    console.log("OUR data IS: " + data);
    if (data) {
      await addData(TypeBases.CARS_IN_SERVICE, {
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
      });
      await dispatch({
        type: serviceCarTypesAction.ADD_SERVICE_CAR,
        payload: {
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
        },
      });
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
                color: "#7975F8",
                "&:hover": {},
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
                backgroundColor: "#705AF8",
                "&:hover": {
                  background: "#7975F8",
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
