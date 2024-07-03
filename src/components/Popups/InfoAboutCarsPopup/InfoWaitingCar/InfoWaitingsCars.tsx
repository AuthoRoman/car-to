import React from "react";
import { ICar } from "../../../../state/types";
import styles from "./InfoWaitingsCars.module.css";
import { Button } from "@mui/material";

const InfoWaitingsCars: React.FC<{ car: ICar; closeInfoCar: any; isOpenPopupEdit:any }> = ({
  car,
  closeInfoCar,
  isOpenPopupEdit
}) => {
  return (
    <div>
      <div onClick={closeInfoCar!} className={styles.InfoWaitingPopup}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={styles.InfoWaitingForm}
        >
          <ul>
            <li>
               
              Имя и фамилия владельца - {car.firstNameOwner}{" "}
              {car.secondNameOwner}
            </li>
            <li>Количество владельцев автомобиля - {car.numberOwners}</li>
            <li>Номер автомобиля - {car.carNumber}</li>
            <li>Цвет автомобиля - {car.color}</li>
            <li>Машина заявлена на обслуживание - {car.date}</li>
            <li>Электронная почта владельца - {car.email}</li>
            <li>ВИН номер автомобиля - {car.VIN}</li>
            <li> Аварии автомобиля - {car.accidents}</li>
            <li>Автомобиль с пробегом - {car.carMileage}</li>
            <li>Автомобиль зарегистрирован - {car.registration}</li>
            <li>
              Проблемы автомобиля - {car.problems.length === 0
                ? " Не отмечены, приехал на тех обслуживание"
                : car.problems}
            </li>
          </ul>
          <Button onClick={ () => isOpenPopupEdit(car.VIN, car.id)} sx={{color:'#705AF8'}}>Редактировать</Button>
        </div>
      </div>
    </div>
  );
};

export default InfoWaitingsCars;
