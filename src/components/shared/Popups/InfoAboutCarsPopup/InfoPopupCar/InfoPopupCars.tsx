import React from "react";
import { UnificatorPropsInfoCar } from "../../../../../state/types";

import styles from "./InfoPopupCars.module.scss";
import { Button, Paper } from "@mui/material";
import ListPointInfo from "../ListPoint/ListPointInfo";
import {
  getLocaleCarInfo,
  localCarInfo,
} from "../../../../../core/utils/localeInfoCar";
import { useTranslation } from "react-i18next";

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
    telEditCar: string,
  ) => void;
}> = ({ car, closeInfoCar, isOpenPopupEdit }) => {
  const { t } = useTranslation("translation");

  return (
    <div>
      <div onClick={closeInfoCar!} className={styles.InfoWaitingPopup}>
        <Paper
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
                  key !== "id",
              )
              .map((carsPref, index) => (
                <ListPointInfo
                  key={index}
                  title={
                    t(
                      getLocaleCarInfo(carsPref as keyof typeof localCarInfo),
                    ) ?? ""
                  }
                  text={car[carsPref as keyof typeof car] ?? ""}
                />
              ))}
          </ul>
          {!car.recomm && !car.manufacturer ? (
            <Button
              onClick={() =>
                isOpenPopupEdit?.(
                  car.VIN ?? "",
                  car.id ?? 0,
                  car.accidents ?? "",
                  car.carMileage ?? "",
                  car.carNumber ?? "",
                  car.color ?? "",
                  car.email ?? "",
                  car.firstNameOwner ?? "",
                  car.secondNameOwner ?? "",
                  car.numberOwners ?? 1,
                  car.problems ?? "",
                  car.registration ?? "",
                  car.tel ?? "",
                )
              }
              sx={{ color: "var(--default-color-button)" }}
            >
              {t("buttons.edit")}
            </Button>
          ) : (
            ""
          )}
        </Paper>
      </div>
    </div>
  );
};

export default InfoWaitingsCars;
