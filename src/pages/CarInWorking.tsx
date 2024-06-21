import React from "react";
import { useTypedSelector } from "../state/hooks/hooks";
import CarsInService from "../components/CarsService/CarsInService";

const CarinWorking: React.FC = () => {
  const cars = useTypedSelector((state) => state.carsinServ.cars);
  return (
    <div>
      <div style={{ width: "1440px", margin: "0 auto" }}>
        {cars.map((x) => (
          <div key={x.id}>
            <CarsInService
              nameMaster={x.nameMaster}
              assemblyPlant={x.assemblyPlant}
              checkDigit={x.checkDigit}
              country={x.country}
              manufacturer={x.manufacturer}
              modelYear={x.modelYear}
              region={x.region}
              serialNumber={x.serialNumber}
              vehicleAttributes={x.vehicleAttributes}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarinWorking;
