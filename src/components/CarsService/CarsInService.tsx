import React from "react";
import styles from "./CarService.module.css";
import { Button } from "@mui/material";
import { cardService, IProblems } from "../../state/types";

interface IProps {
  nameMaster: string;
  id: number;
  VIN: string;
  region: string;
  country: string;
  manufacturer: string;
  vehicleAttributes: string;
  checkDigit: string;
  modelYear: string;
  assemblyPlant: string;
  serialNumber: string;
  problems: IProblems;
  togglePopup: any;
  funSetCurrentCar: any;
}

const CarsInService: React.FC<IProps> = ({
  nameMaster,
  id,
  VIN,
  region,
  country,
  manufacturer,
  vehicleAttributes,
  checkDigit,
  modelYear,
  assemblyPlant,
  serialNumber,
  problems,
  togglePopup,
  funSetCurrentCar,
}) => {
  const car = {
    nameMaster,
    id,
    VIN,
    region,
    country,
    manufacturer,
    vehicleAttributes,
    checkDigit,
    modelYear,
    assemblyPlant,
    serialNumber,
    problems,
    togglePopup,
    funSetCurrentCar,
  };
  const CurrentCar = (carCurr: cardService) => {
    funSetCurrentCar(carCurr);
    togglePopup(true);
  };
  
  return (
    <div>
      <div className={styles.carService}>
        <h5>
          Машину {manufacturer} с сирийным номером {car.serialNumber}{" "}
          ремонтирует наш специалист - {nameMaster}
        </h5>
        <div>
          <p>Машина {modelYear} года выпуска</p>
          <p>Собрана на заводе {assemblyPlant}</p>
          <p>С техническими характеристиками {vehicleAttributes}</p>
        </div>
        <div>
          <Button
            onClick={() => CurrentCar(car)}
            sx={{
              backgroundColor: "#705AF8",
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

export default CarsInService;
