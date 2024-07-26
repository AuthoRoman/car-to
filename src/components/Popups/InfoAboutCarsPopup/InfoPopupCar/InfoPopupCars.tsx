import React from "react";
import {
  UnificatorPropsInfoCar,
  LocalInRussianKeys,
  localInRussianInfo,
} from "../../../../state/types";

import styles from "./InfoPopupCars.module.scss";
import { Button } from "@mui/material";
import ListPointInfo from "../ListPoint/ListPointInfo";

const InfoWaitingsCars: React.FC<{
  car: UnificatorPropsInfoCar;
  closeInfoCar?: () => void;
  isOpenPopupEdit?: (
    VINEditCar: string,
    idEditCar: number,
    accidentsEditCar: string,
    carMileageEditCar: string,
    carNumberEditCar: string,
    colorEditCar: string,
    emailEditCar: string,
    firstNameOwnerEditCar: string,
    secondNameOwnerEditCar: string,
    numberOwnersEditCar: number,
    problemsEditCar: string,
    registrationEditCar: string,
    telEditCar: string
  ) => void;
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
            {Object.keys(car)
              .filter(
                (key) =>
                  car[key as keyof UnificatorPropsInfoCar] !== undefined &&
                  car[key as keyof UnificatorPropsInfoCar] !== "" &&
                  key !== "id"
              )
              .map((carsPref, index) => (
                <ListPointInfo
                  key={index}
                  title={
                    localInRussianInfo[carsPref as LocalInRussianKeys] ?? ""
                  }
                  text={car[carsPref as keyof typeof car] ?? ""}
                />
              ))}
          </ul>
          {!car.recomm && !car.manufacturer ? (
            <Button
              onClick={() =>
                isOpenPopupEdit!(
                  car.VIN!,
                  car.id!,
                  car.accidents!,
                  car.carMileage!,
                  car.carNumber!,
                  car.color!,
                  car.email!,
                  car.firstNameOwner!,
                  car.secondNameOwner!,
                  car.numberOwners!,
                  car.problems!,
                  car.registration!,
                  car.tel!
                )
              }
              sx={{ color: "#705AF8" }}
            >
              Редактировать
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoWaitingsCars;
