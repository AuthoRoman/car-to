import FinishPopup from "../../components/Popups/FinishPopup/FinishPopup";
import InfoWaitingsCars from "../../components/Popups/InfoAboutCarsPopup/InfoPopupCar/InfoPopupCars";
import React from "react";
import { cardService } from "../../state/types";

interface IPopupsProps {
  isOpen: boolean;
  isOpenServiceInfo: boolean;
  currentCar: cardService | undefined;
  togglePopup: (booleanValue: boolean) => void;
  closeInfoCar: () => void;
}

export const Popups = (props: IPopupsProps) => {
  const { togglePopup, isOpen, isOpenServiceInfo, closeInfoCar, currentCar } =
    props;

  return (
    <>
      {isOpen && <FinishPopup togglePopup={togglePopup} car={currentCar} />}
      {isOpenServiceInfo && currentCar && (
        <InfoWaitingsCars closeInfoCar={closeInfoCar} car={currentCar} />
      )}
    </>
  );
};
