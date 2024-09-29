import React from "react";
import ServicePopup from "../../components/shared/Popups/ServicePopup/ServicePopup";
import InfoWaitingsCars from "../../components/shared/Popups/InfoAboutCarsPopup/InfoPopupCar/InfoPopupCars";
import CreateCardPopup from "../../components/shared/Popups/CreateCardWaitingsPopup/CreateCardPopup";
import { useTypedSelector } from "../../state/hooks/hooks";

interface ICarsListWaitingsPopupsProps {
  isVisiblePopup: boolean;
  isOpenPopupEdit: boolean;
  PopupFixCar: boolean;
  isVisiblePopupWaitingsCar: boolean;
  close: () => void;
  closeEditor: (paramVisible: boolean) => void;
  closeWithNextStadyCar: () => void;
  closeInfoCar: (() => void) | undefined;
  openPopupEdit?: () => void;
}

const CarsListWaitingsPopups: React.FC<ICarsListWaitingsPopupsProps> = (
  props,
) => {
  const {
    isVisiblePopup,
    isOpenPopupEdit,
    PopupFixCar,
    isVisiblePopupWaitingsCar,
    closeEditor,
    closeWithNextStadyCar,
    openPopupEdit,
    closeInfoCar,
    close,
  } = props;

  const car = useTypedSelector((state) => state.currentCar);

  return (
    <>
      {isVisiblePopup && (
        <div>
          <CreateCardPopup closeVisible={close} />{" "}
        </div>
      )}
      {isOpenPopupEdit && (
        <div>
          <CreateCardPopup closeVisible={closeEditor} />{" "}
        </div>
      )}
      {PopupFixCar && (
        <div>
          <ServicePopup
            closeWithNextStadyCar={closeWithNextStadyCar}
            closeVisible={close}
            car={car ?? ""}
            problems={car.problems ?? ""}
          />
        </div>
      )}
      {isVisiblePopupWaitingsCar && (
        <div>
          <InfoWaitingsCars
            car={car}
            closeInfoCar={closeInfoCar}
            isOpenPopupEdit={openPopupEdit}
          />
        </div>
      )}
    </>
  );
};

export default CarsListWaitingsPopups;
