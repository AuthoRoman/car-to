import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  cardService,
  finishCarTypesAction,
  serviceCarTypesAction,
  TypeBases,
} from "../../../state/types";
import { useDispatch } from "react-redux";
import { addData, deleteData } from "../../../api/database/db";

import styles from "./FinishPopup.module.css";

const FinishPopup: React.FC<{
  togglePopup: any;
  car: cardService | undefined;
}> = ({ togglePopup, car }) => {
  const dispatch = useDispatch();
  const [recomm, setRecomm] = useState("");
  const [workOncar, setWorkOnCar] = useState("");
  const addCarFinish = async () => {
    if (car) {
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
      await deleteData(TypeBases.CARS_IN_SERVICE, car.id);
      await addData(TypeBases.CARS_IN_FINISH, {
        id: carCurr.id,
        VIN: carCurr.VIN,
        date: date,
        modelYear: carCurr.modelYear,
        recomm: carCurr.recomm,
        workOncar: workOncar,
        nameMaster: carCurr.nameMaster,
        region: carCurr.region,
        country: carCurr.country,
        problems: carCurr.problems,
        manufacturer: carCurr.manufacturer,
        checkDigit: carCurr.checkDigit,
        assemblyPlant: carCurr.assemblyPlant,
        serialNumber: carCurr.serialNumber,
      });

      dispatch({
        type: serviceCarTypesAction.DELETE_SERVICE_CAR,
        payload: { ...car, date: date },
      });
      dispatch({ type: finishCarTypesAction.ADD_FINISH_CAR, payload: carCurr });
      togglePopup(false);
    }
  };

  const carCurr = { ...car, recomm, workOncar };

  return (
    <div className={styles.finishPopup}>
      <div className={styles.finishForm}>
        <span>Имя мастера, проводившего обслуживание - {car?.nameMaster} </span>

        <div className={styles.finishPopup__inner} id="my-helper-text">
          Были проведены следующие работы:
          <TextField
            color="primary"
            onChange={(e) => setWorkOnCar(e.target.value)}
            sx={{
              margin: "13px",
              width: "380px",

              backgroundColor: "white",
            }}
            placeholder="Работы, которые были проведены"
            multiline
          />
          <div style={{ margin: "13px 0 0 0" }}>Рекомендации:</div>
          <TextField
            color="primary"
            onChange={(e) => setRecomm(e.target.value)}
            sx={{
              margin: "13px",
              width: "380px",

              backgroundColor: "white",
            }}
            placeholder="Рекомендации по дальнейшему использованию авто"
            multiline
          />
          <Button
            onClick={() => togglePopup(false)}
            sx={{
              height: `30px`,
              width: `180px`,
              margin: `15px`,
              transition: "all .8s",
              color: "#7975F8",
            }}
          >
            Отмена
          </Button>
          <Button
            onClick={addCarFinish}
            sx={{
              backgroundColor: "#7975F8",
              height: `30px`,
              width: `180px`,
              margin: `15px`,
              transition: "all .8s",
              "&:hover": {
                background: "#7975F8",
              },
            }}
            variant="contained"
          >
            Выполнено
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FinishPopup;
