import React, { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import styles from "./CarFinishComponent.module.css";
import {
  cardFinish,
  finishCarTypesAction,
  ICar,
  localInRussian,
  LocalInRussianKeys,
  TypeBases,
} from "../../state/types";
import { deleteData, getStoreData } from "../../api/database/db";

import DeleteIcon from "@mui/icons-material/Delete";

export default function CarFinishComponent() {
  const dispatch = useTypedDispatch();
  const deleteHandler = async (car: cardFinish) => {
    await deleteData(TypeBases.CARS_IN_FINISH, car.id);
    dispatch({ type: finishCarTypesAction.DELETE_FINISH_CAR, payload: car });
  };

  const cars = useTypedSelector((state) => state.carsInFinish.cars);

  useEffect(() => {
    if (cars.length == 0) {
      (async () => {
        const carsDB = await getStoreData<ICar>(TypeBases.CARS_IN_FINISH);
        carsDB.map((car) =>
          dispatch({ type: finishCarTypesAction.ADD_FINISH_CAR, payload: car })
        );
      })();
    }
  }, []);
  return (
    <div>
      <div>
        {cars.map((car) => (
          <div key={car.id} className={styles.carFinishCard}>
            <div className={styles.carFinishCard__header}>
              <div className={styles.carFinishCard__headerTitle}>
                <div>Отремонтирован авто {car.manufacturer} </div>
                <div> Мастером {car.nameMaster} </div>
              </div>
              <DeleteIcon
                sx={{
                  transition: "all .8s",
                  "&:hover": {
                    color: "#705AF8",
                  },
                }}
                onClick={() => deleteHandler(car)}
              />
            </div>

            <div className={styles.carFinishCard__body}>
              <span>Проблемы автомобиля:</span>
              <ul>
                {car &&
                  Object.keys(car.problems).map((problemId) => (
                    <li className={styles.finishPopup__lists} key={problemId}>
                      {car.problems[problemId as LocalInRussianKeys]
                        ? `${
                            localInRussian[problemId as LocalInRussianKeys] ?? problemId 
                          } :  Отремонтировано`
                        : ` ${
                            localInRussian[problemId as LocalInRussianKeys]?? problemId
                          }  : Повреждений не было обнаружено`}
                    </li>
                  ))}
              </ul>
            </div>

            <div className={styles.carFinishCard__recomm}>
              <span className={styles.carFinishCard__recommTitle}>
                Рекомендации по дальнейшему использованию авто:
              </span>

              <div className={styles.carFinishCard__recommText}>
                {car.recomm}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
