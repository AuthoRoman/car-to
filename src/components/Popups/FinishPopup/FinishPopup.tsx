import {
  Button,
  colors,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./FinishPopup.module.css";
import {
  cardService,
  finishCarTypesAction,
  localInRussian,
  LocalInRussianKeys,
  serviceCarTypesAction,
  TypeBases,
} from "../../../state/types";
import { useDispatch } from "react-redux";
import { addData, deleteData } from "../../../api/database/db";

const FinishPopup: React.FC<{
  togglePopup: any;
  car: cardService | undefined;
}> = ({ togglePopup, car }) => {
  const dispatch = useDispatch();
  const [recomm, setRecomm] = useState("");
  const addCarFinish = async () => {
    if (car) {
      await deleteData(TypeBases.CARS_IN_SERVICE, car.id);
      await addData(TypeBases.CARS_IN_FINISH, {
        id: carCurr.id,
        VIN: carCurr.VIN,
        modelYear: carCurr.modelYear,
        recomm: carCurr.recomm,
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
        payload: car,
      });
      dispatch({ type: finishCarTypesAction.ADD_FINISH_CAR, payload: carCurr });
      togglePopup(false);
    }
  };

  const carCurr = { ...car, recomm };

  return (
    <div className={styles.finishPopup}>
      <div className={styles.finishForm}>
        <span>Имя мастера, проводившего обслуживание - {car?.nameMaster} </span>

        <div className={styles.finishPopup__inner} id="my-helper-text">
          Были проведены следующие работы:
          {car &&
            Object.keys(car.problems).map((problemId) => (
              <div className={styles.finishPopup__lists} key={problemId}>
                {car.problems[problemId as LocalInRussianKeys]
                  ? `  Отремонтировано : ${
                      localInRussian[problemId as LocalInRussianKeys] ?? problemId
                    }`
                  : " "}
              </div>
            ))}
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
              color:'#7975F8',
               
            }}
             
          >
            Отмена
          </Button>
          <Button
            onClick={addCarFinish}
            sx={{
              backgroundColor: '#7975F8',
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
