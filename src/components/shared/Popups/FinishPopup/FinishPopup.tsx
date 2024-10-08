import { Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";

import { useDispatch } from "react-redux";

import styles from "./FinishPopup.module.scss";
import { deleteServiceCar } from "../../../../state/slices/ServiceCarSlice";
import { carsServiceAPI } from "../../../../pages/CarsService/api/CarsServiceAPI";
import { carFinishAPI } from "../../../../pages/CarFinish/api/CarFinishAPI";
import { cardService } from "../../../../pages/CarsService/types";
import { cardFinish } from "../../../../pages/CarFinish/types";
import { addFinishCar } from "../../../../state/slices/FinishCarSlice";
import { useTranslation } from "react-i18next";

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

  const { t } = useTranslation(["translatePopups", "translation"]);

  return (
    <div className={styles.finishPopup}>
      <div>
        <Paper
          sx={{
            minWidth: "600px",
            dispaly: "flex",
            flexDirection: "column",
            gap: "15px",
            borderRadius: "5px",
            overflowY: "auto",
            minHeight: "370px",
            maxHeight: "500px",
            width: "500px",
            padding: "30px",
          }}
        >
          <span>
            {t("FinishPopup.title")} {car?.nameMaster}{" "}
          </span>

          <div className={styles.finishPopup__inner} id="my-helper-text">
            {t("FinishPopup.firstSubTitle")}
            <TextField
              color="primary"
              onChange={(e) => setWorkOnCar(e.target.value)}
              sx={{
                margin: "13px",
                width: "380px",
              }}
              placeholder={t("FinishPopup.firstPlaceholder")}
              multiline
            />
            <div style={{ margin: "13px 0 0 0" }}>
              {t("FinishPopup.recommendations")}
            </div>
            <TextField
              color="primary"
              onChange={(e) => setRecomm(e.target.value)}
              sx={{
                margin: "13px",
                width: "380px",
              }}
              placeholder={t("FinishPopup.secondPlaceholder")}
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
              {t("translation:buttons.cancel")}
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
              {t("translation:buttons.complete")}
            </Button>
          </div>
        </Paper>
      </div>
    </div>
  );
};

export default FinishPopup;
