import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

import styles from "./FinishPopup.module.scss";
import { deleteServiceCar } from "../../../state/slices/ServiceCarSlice";
import { carsServiceAPI } from "../../../pages/CarsService/api/CarsServiceAPI";
import { carFinishAPI } from "../../../pages/CarFinish/api/CarFinishAPI";
import { cardService } from "../../../pages/CarsService/types";
import { cardFinish } from "../../../pages/CarFinish/types";
import { addFinishCar } from "../../../state/slices/FinishCarSlice";

interface IFinishPopupProps {
  togglePopup: (toggleParam: boolean) => void;
  car: cardService | undefined;
}

const FinishPopup: React.FC<IFinishPopupProps> = ({ togglePopup, car }) => {
  const dispatch = useDispatch();
  const [recomm, setRecomm] = useState("");
  const [workOncar, setWorkOnCar] = useState("");
  const [deleteData] = carsServiceAPI.useDeleteCArSrviceMutation();
  const [addDataCarFinish] = carFinishAPI.useAddCarFinishMutation();
  const addCarFinish = async () => {
    if (car) {
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

      await deleteData(car.id);
      const { data: newCar } = await addDataCarFinish(carCurr as cardFinish);

      dispatch(deleteServiceCar({ ...car, date: date }));

      dispatch(addFinishCar(newCar as cardFinish));
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
              height: `30px`,
              width: `180px`,
              margin: `15px`,
              backgroundColor: "var(--default-color-button)",
              transition: "var(--default-transition)",
              "&:hover": {
                background: "var(--default-color-button-hover)",
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
