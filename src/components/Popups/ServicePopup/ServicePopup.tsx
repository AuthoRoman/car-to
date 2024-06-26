import React, { useState } from "react";
import styles from "./ServicePopup.module.css";
import { Button, Input, TextField } from "@mui/material";

import { useTypedDispatch } from "../../../state/hooks/hooks";
import {
  ICar,
  IProblems,
  serviceCarTypesAction,
  TypeBases,
} from "../../../state/types";
import decodeVIN from "../../../api/VIN/VinAPI";
import { addData, deleteData } from "../../../api/database/db";

const ServicePopup: React.FC<{
  closeVisible: any;
  VIN: string;
  problems: IProblems | undefined;
  closeWithNextStadyCar: any;
}> = ({ closeVisible, VIN, problems, closeWithNextStadyCar }) => {
  const dispatch = useTypedDispatch();
  const randomIdKey = Math.random() * 100;
  const [nameMaster, setNameMaster] = useState("");

  async function submitForm(VIN: any, name: string, problems: IProblems) {
    console.log("OUR VIN IS: " + VIN);
    const data = await decodeVIN(VIN);
    console.log("OUR data IS: " + data);
    if (data) {
      await addData(TypeBases.CARS_IN_SERVICE, {
        id: randomIdKey,
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
        problems: problems,
      });
      await dispatch({
        type: serviceCarTypesAction.ADD_SERVICE_CAR,
        payload: {
          id: randomIdKey,
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
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            variant="standard"
            placeholder="Name"
            color="primary"
          />

          <div className={styles.form__footer}>
            <Button
              onClick={() => closeVisible(false)}
              sx={{
                color: "#7975F8",
                "&:hover": {
                   
                },
              }}
               
            >
              Cancel
            </Button>
            <Button
              disabled={!nameMaster.trim().length}
              onClick={() =>
                submitForm(
                  VIN,
                  nameMaster,
                  problems
                    ? problems
                    : {
                        alarm: false,
                        brakeSystem: false,
                        catalyst: false,
                        engine: false,
                        fuses: false,
                        generator: false,
                        steeringSystem: false,
                        windshieldWashers: false,
                      }
                )
              }
              sx={{
                backgroundColor: "#705AF8",
                "&:hover": {
                  background: "#7975F8",
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
