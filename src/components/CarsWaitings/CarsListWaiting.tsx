import React, { useState } from "react";
import { useTypedSelector } from "../../state/hooks/hooks";
import CarComponent from "./CarComponent/CarComponent";
import CreateCardPopup from "../Popups/CreateCardPopup";

const CarsListWaiting = () => {
  const cars = useTypedSelector((state) => state.cars.cars);
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  function close() {
    setIsVisiblePopup(false);
  }
  return (
    <div >
      {isVisiblePopup && (
        <div>
          <CreateCardPopup closeVisible={close} />{" "}
        </div>
      )}
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        {cars.map((x) => (
          <CarComponent
            key={x.id}
            nameOwner={x.firstNameOwner + " " + x.secondNameOwner}
            tel={x.tel}
            problems={x.problems}
          />
        ))}
      </div>
      <button
        onClick={() => setIsVisiblePopup(true)}
        style={{ height: "fit-content" }}
      >
        Add Car
      </button>
    </div>
      
    </div>
  );
};

export default CarsListWaiting;
