import React, { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import CarComponent from "./CarComponent/CarComponent";
import CreateCardPopup from "../Popups/CreateCardWaitingsPopup/CreateCardPopup";
import ServicePopup from "../Popups/ServicePopup/ServicePopup";
import { Button } from "@mui/material";
import {
  ICar,
  ICarsState,
  TypeBases,
  typesOfActionsCar,
} from "../../state/types";
import { addData, deleteData, getStoreData } from "../../api/database/db";

const CarsListWaiting = () => {
  const dispatch = useTypedDispatch();

  const cars = useTypedSelector((state) => state.cars.cars);
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [PopupFixCar, setPopupFixCar] = useState(false);
  const [currentCar, setCurrentCar] = useState<ICar>();
  const [VIN, setVIN] = useState("");
  useEffect(() => {
    (async () => {
      if (cars.length == 0) {
        const carsDB = await getStoreData<ICar>(TypeBases.CARS_IN_WAITING);
        carsDB.map((x) =>
          dispatch({ type: typesOfActionsCar.ADD_CAR, payload: x })
        );
      }
    })();
  }, []);

  const closeWithNextStadyCar = async () => {
    if (currentCar) {
      console.log('сейчай удаляется ' + currentCar.id)
       await dispatch({ type: typesOfActionsCar.DELETE_CAR, payload: currentCar! });
      await deleteData(TypeBases.CARS_IN_WAITING, currentCar.id);
      
     
      setPopupFixCar(false);
    }
  };

  const close = () => {
    PopupFixCar ? setPopupFixCar(false) : setIsVisiblePopup(false);
  };

  async function handleServicePop(VIN: string, car: ICar) {
    await setCurrentCar(car);
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
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {cars.map((x) => (
              <div onClick={() => handleServicePop(x.VIN, x)} key={x.id}>
                <CarComponent
                  nameOwner={x.firstNameOwner + " " + x.secondNameOwner}
                  tel={x.tel}
                  problems={x.problems!}
                />
              </div>
            ))}
          </div>
          <div>
            <Button
              onClick={() => setIsVisiblePopup(true)}
              sx={{
                backgroundColor: "#705AF8",
                height: `60px`,
                transition: "all .8s",
                "&:hover": {
                  background: "#7975F8",
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
