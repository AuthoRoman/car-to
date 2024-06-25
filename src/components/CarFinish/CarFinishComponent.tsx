import React, { useEffect } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import styles from "./CarFinishComponent.module.css";
import { finishCarTypesAction, ICar, localInRussian, LocalInRussianKeys, TypeBases } from "../../state/types";
import { getStoreData } from "../../api/database/db";

export default function CarFinishComponent() {
  const cars = useTypedSelector((state) => state.carsInFinish.cars);
  const dispatch = useTypedDispatch()
  useEffect(() => {
    if(cars.length == 0){
       (async () =>{
        const carsDB = await getStoreData<ICar>(TypeBases.CARS_IN_FINISH)
        carsDB.map((car) => dispatch({type:finishCarTypesAction.ADD_FINISH_CAR, payload: car}))
     })()
     
    }
    
  }, []);
  return (
    <div>
      <div>
        {cars.map((car) => (
          <div key={car.id} className={styles.carFinishCard}>
            <div>Отремонтирован авто {car.manufacturer} </div>
            <div> Мастером {car.nameMaster}</div>
            <div className={styles.carFinishCard__body}>
              <span>Проблемы автомобиля:</span>
              <ul>
                {car &&
                  Object.keys(car.problems).map((problemId) => (
                    <li className={styles.finishPopup__lists} key={problemId}>
                      {car.problems[problemId as LocalInRussianKeys]
                        ? `${
                            localInRussian[problemId as LocalInRussianKeys]
                          } :  Отремонтировано`
                        : ` ${
                            localInRussian[problemId as LocalInRussianKeys]
                          }  : Повреждений не было обнаружено `}
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
