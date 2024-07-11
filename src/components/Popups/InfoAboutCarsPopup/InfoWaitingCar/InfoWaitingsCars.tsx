import React from "react";
import { ICar } from "../../../../state/types";
import styles from "./InfoWaitingsCars.module.css";
import { Button } from "@mui/material";

const InfoWaitingsCars: React.FC<{
  car: ICar;
  closeInfoCar: any;
  isOpenPopupEdit: any;
}> = ({ car, closeInfoCar, isOpenPopupEdit }) => {
  return (
    <div>
      <div onClick={closeInfoCar!} className={styles.InfoWaitingPopup}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.InfoWaitingForm}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "space-between",
              gap: "5px",
            }}
          >
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                Имя и фамилия
                владельца.................................................................
              </span>
              <span className={styles.valueOfPoints}>
                {car.firstNameOwner} {car.secondNameOwner}
              </span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                Количество владельцев
                автомобиля............................................
              </span>
              <span className={styles.valueOfPoints}>{car.numberOwners}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                Номер
                автомобиля................................................................................
              </span>
              <span className={styles.valueOfPoints}>{car.carNumber}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                Цвет
                автомобиля....................................................................................
              </span>
              <span className={styles.valueOfPoints}>
                {car.color.length === 0 ? "Цвет неизвестен" : car.color}
              </span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                Машина заявлена на
                обслуживание............................................
              </span>
              <span className={styles.valueOfPoints}>{car.date}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                Электронная почта
                владельца.........................................................
              </span>
              <span className={styles.valueOfPoints}>{car.email}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                ВИН номер
                автомобиля......................................................................
              </span>
              <span className={styles.valueOfPoints}>{car.VIN}</span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                Аварии
                автомобиля...............................................................................
              </span>
              <span className={styles.valueOfPoints}>
                {car.accidents.length === 0
                  ? "Аварии автомобиля не указаны"
                  : car.accidents}
              </span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                Автомобиль с
                пробегом......................................................................
              </span>
              <span className={styles.valueOfPoints}>
                {car.carMileage.length === 0
                  ? "Марка автомобиля неизвестна"
                  : car.carMileage}
              </span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                Автомобиль
                зарегистрирован..........................................................
              </span>
              <span className={styles.valueOfPoints}>
                {car.registration.length === 0
                  ? "Регистрация автомобиля не указана"
                  : car.registration}
              </span>
            </li>
            <li className={styles.InfoWaitingPopup__innerPoints}>
              <span className={styles.titlePoints}>
                Проблемы
                автомобиля........................................................................
              </span>
              <span className={styles.valueOfPoints}>
                {car.problems.length === 0
                  ? " Не отмечены, приехал на тех обслуживание"
                  : car.problems}
              </span>
            </li>
          </ul>
          <Button
            onClick={() => isOpenPopupEdit(car.VIN, car.id)}
            sx={{ color: "#705AF8" }}
          >
            Редактировать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoWaitingsCars;
