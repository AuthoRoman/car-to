import React from "react";
import styles from "./CarService.module.css";

interface IProps {
  nameMaster: string;
  region: string;
  country: string;
  manufacturer: string;
  vehicleAttributes: string;
  checkDigit: string;
  modelYear: string;
  assemblyPlant: string;
  serialNumber: string;
}
const CarsInService: React.FC<IProps> = ({
  nameMaster,
  region,
  country,
  manufacturer,
  vehicleAttributes,
  checkDigit,
  modelYear,
  assemblyPlant,
  serialNumber,
}) => {
  return (
    <div>
      <div className={styles.carService}>
        <h5>
          Машину {manufacturer} с сирийным номером {serialNumber} ремонтирует
          наш специалист - {nameMaster}
        </h5>
        <div>
          <p>Машина {modelYear} года выпуска</p>
          <p>Собрана на заводе {assemblyPlant}</p>
          <p>С техническими характеристиками {vehicleAttributes}</p>
        </div>
      </div>
    </div>
  );
};

export default CarsInService;
