import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../state/hooks/hooks";
import CarsInService from "../components/CarsService/CarsInService";
import FinishPopup from "../components/Popups/FinishPopup/FinishPopup";
import {
  cardService,
  ICar,
  serviceCarTypesAction,
  TypeBases,
} from "../state/types";
import { useDispatch } from "react-redux";
import { getStoreData } from "../api/database/db";

const CarinWorking: React.FC = () => {
  const cars = useTypedSelector((state) => state.carsInServ.cars);
  const dispatch = useDispatch();
  const [currentCar, setCurrentCar] = useState<cardService>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      if (cars.length == 0) {
        const carsDB = await getStoreData<ICar>(TypeBases.CARS_IN_SERVICE);
        carsDB.map((x) =>
          dispatch({ type: serviceCarTypesAction.ADD_SERVICE_CAR, payload: x })
        );
      }
    })();
  }, []);

  const togglePopup = (booleanValue: boolean) => {
    setIsOpen(booleanValue);
  };

  const funSetCurrentCar = (car: cardService) => {
    return setCurrentCar(car);
  };
  return (
    <div>
      {isOpen && (
        <div>
          <FinishPopup togglePopup={togglePopup} car={currentCar} />
        </div>
      )}

      <div style={{ width: "1440px", margin: "0 auto" }}>
        {cars.map((x) => (
          <div key={x.id}>
            <CarsInService
              id={x.id}
              VIN={x.VIN}
              nameMaster={x.nameMaster}
              assemblyPlant={x.assemblyPlant}
              checkDigit={x.checkDigit}
              country={x.country}
              manufacturer={x.manufacturer}
              modelYear={x.modelYear}
              region={x.region}
              serialNumber={x.serialNumber}
              vehicleAttributes={x.vehicleAttributes}
              problems={x.problems}
              togglePopup={togglePopup}
              funSetCurrentCar={funSetCurrentCar}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarinWorking;
