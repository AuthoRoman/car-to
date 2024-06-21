import React, { useState } from "react";
import styles from "./ServicePopup.module.css";
import { Button, Input } from "@mui/material";

import { useTypedDispatch } from "../../../state/hooks/hooks";
import { serviceCarTypesAction } from "../../../state/types";
import decodeVIN from "../../../api/VinAPI";

const ServicePopup: React.FC<{ closeVisible: any; VIN: string }> = ({
  closeVisible,
  VIN,
}) => {
  const dispatch = useTypedDispatch();

  const [nameMaster, setNameMaster] = useState("");

  async function submitForm(VIN: any, name: string) {
    const data = await decodeVIN(VIN);
    if (data) {
      await dispatch({
        type: serviceCarTypesAction.ADD_SERVICE_CAR,
        payload: {
          id: Math.random(),
          VIN: VIN,
          region: data.region,
          country: data.country,
          manufacturer: data.manufacturer,
          vehicleAttributes: data.vehicleAttributes,
          checkDigit: data.checkDigit,
          modelYear: data.modelYear,
          assemblyPlant: data.assemblyPlant,
          serialNumber: data.serialNumber,
          nameMaster: name,
        },
      });
      closeVisible(false);
    }
  }

  return (
    <div>
      <div className={styles.createCardPopup}>
        <form className={styles.form} action="">
          <h1>Имя мастера взявшего автомобиль на обслуживание</h1>

          <Input
            value={nameMaster}
            onChange={(e) => setNameMaster(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Name"
          />

          <div className={styles.form__footer}>
            <Button
              onClick={() => closeVisible(false)}
              sx={{
                backgroundColor: "#e68d1a",
                "&:hover": {
                  background: "#aa670e",
                },
              }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={() => submitForm(VIN, nameMaster)}
              sx={{
                backgroundColor: "#e68d1a",
                "&:hover": {
                  background: "#aa670e",
                },
              }}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicePopup;
