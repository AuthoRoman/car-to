import React, { useState } from "react";
import { useTypedSelector } from "../../state/hooks/hooks";
import CarComponent from "./CarComponent/CarComponent";
import CreateCardPopup from "../Popups/CreateCardWaitingsPopup/CreateCardPopup";
import ServicePopup from "../Popups/ServicePopup/ServicePopup";
import { Button } from "@mui/material";

const CarsListWaiting = () => {
  const cars = useTypedSelector((state) => state.cars.cars);
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [PopupFixCar, setPopupFixCar] = useState(false);
  const [VIN, setVIN] = useState("");
  function close() {
    PopupFixCar ? setPopupFixCar(false) : setIsVisiblePopup(false);
  }
  function handleServicePop(props: string) {
    setVIN(props);
    setPopupFixCar(true);
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
          <ServicePopup closeVisible={close} VIN={VIN} />
        </div>
      )}
      <div style={{ width: "1440px", margin: " auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            {cars.map((x) => (
              <div onClick={() => handleServicePop(x.VIN)} key={x.id}>
                <CarComponent
                  nameOwner={x.firstNameOwner + " " + x.secondNameOwner}
                  tel={x.tel}
                  problems={x.problems}
                />
              </div>
            ))}
          </div>

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
  );
};

export default CarsListWaiting;
