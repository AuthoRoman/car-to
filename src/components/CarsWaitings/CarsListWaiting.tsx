import React, { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import CarComponent from "./CarComponent/CarComponent";
import CreateCardPopup from "../Popups/CreateCardWaitingsPopup/CreateCardPopup";
import ServicePopup from "../Popups/ServicePopup/ServicePopup";
import { Button } from "@mui/material";
import { ICar, ICarsState, typesOfActionsCar } from "../../state/types";

const CarsListWaiting = () => {
  const dispatch = useTypedDispatch();

  const cars = useTypedSelector((state) => state.cars.cars);
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [PopupFixCar, setPopupFixCar] = useState(false);
  const [currentCar, setCurrentCar] = useState<ICar>();
  const [VIN, setVIN] = useState("");

  const closeWithNextStadyCar = () => {
    dispatch({ type: typesOfActionsCar.DELETE_CAR, payload: currentCar! });
    setPopupFixCar(false);
  };

  const close = () => {
    PopupFixCar ? setPopupFixCar(false) : setIsVisiblePopup(false);
  };

  async function handleServicePop(VIN: string, car: ICar) {
    setCurrentCar(car);
    await setVIN(VIN);
    await setPopupFixCar(true);
  }
  return (
    <div>
      {isVisiblePopup && (
        <div>
          <CreateCardPopup closeVisible={close} />{" "}
        </div>
      )}
      {PopupFixCar && (
        <div>
          <ServicePopup
            closeWithNextStadyCar={closeWithNextStadyCar}
            closeVisible={close}
            VIN={VIN}
            problems={currentCar?.problems}
          />
        </div>
      )}
      <div style={{ maxWidth: "1440px", margin:'0 auto'}}>
        <div style={{ display: "flex", justifyContent: "space-between",   }}>
          <div>
            {cars.map((x) => (
              <div onClick={() => handleServicePop(x.VIN, x)} key={x.id}>
                <CarComponent
                  nameOwner={x.firstNameOwner + " " + x.secondNameOwner}
                  tel={x.tel}
                  problems={x.problems}
                />
              </div>
            ))}
          </div>
          <div>
            <Button
              onClick={() => setIsVisiblePopup(true)}
              sx={{
                backgroundColor: "#382274",
                height: `60px`,
                transition: "all .8s",
                "&:hover": {
                  background: "#e68d1a",
                },
              }}
              variant="contained"
            >
              Add Car
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsListWaiting;
