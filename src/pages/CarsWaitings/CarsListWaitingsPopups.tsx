import React from "react";
import ServicePopup from "../../components/Popups/ServicePopup/ServicePopup";
import InfoWaitingsCars from "../../components/Popups/InfoAboutCarsPopup/InfoPopupCar/InfoPopupCars";
import CreateCardPopup from "../../components/Popups/CreateCardWaitingsPopup/CreateCardPopup";
import { ICar } from "../../state/types";

interface ICarsListWaitingsPopupsProps {
  isVisiblePopup: boolean;
  isOpenPopupEdit: boolean;
  PopupFixCar: boolean;
  isVisiblePopupWaitingsCar: boolean;
  close: () => void;
  CurrentCarId: number;
  VIN: string;
  accidents: string;
  carMileage: string;
  carNumber: string;
  color: string;
  email: string;
  tel: string;
  secondNameOwner: string;
  firstNameOwner: string;
  currentCar: ICar;
  numberOwners: number;
  problems: string;
  registration: string;
  closeEditor: (paramVisible: boolean) => void;
  closeWithNextStadyCar: () => void;
  closeInfoCar: (() => void) | undefined;
  openPopupEdit?: (
    VINEditCar: string,
    idEditCar: number,
    accidentsEditCar: string,
    carMileageEditCar: string,
    carNumberEditCar: string,
    colorEditCar: string,
    emailEditCar: string,
    firstNameOwnerEditCar: string,
    secondNameOwnerEditCar: string,
    numberOwnersEditCar: number,
    problemsEditCar: string,
    registrationEditCar: string,
    telEditCar: string,
  ) => void;
}

const CarsListWaitingsPopups: React.FC<ICarsListWaitingsPopupsProps> = (
  props,
) => {
  const {
    isVisiblePopup,
    isOpenPopupEdit,
    PopupFixCar,
    isVisiblePopupWaitingsCar,
    currentCar,
    CurrentCarId,
    VIN,
    accidents,
    carMileage,
    carNumber,
    color,
    email,
    firstNameOwner,
    secondNameOwner,
    numberOwners,
    tel,
    problems,
    registration,
    closeEditor,
    closeWithNextStadyCar,
    openPopupEdit,
    closeInfoCar,
    close,
  } = props;
  return (
    <>
      {isVisiblePopup && (
        <div>
          <CreateCardPopup closeVisible={close} />{" "}
        </div>
      )}
      {isOpenPopupEdit && (
        <div>
          <CreateCardPopup
            idCar={CurrentCarId}
            VINcar={VIN}
            editAccidents={accidents}
            editCarMileage={carMileage}
            editCarNumber={carNumber}
            editColor={color}
            editEmail={email}
            editFirstNameOwner={firstNameOwner}
            editSecondNameOwner={secondNameOwner}
            editNumberOwners={numberOwners!}
            editPhone={tel}
            editProblems={problems}
            editRegistration={registration}
            closeVisible={closeEditor}
          />{" "}
        </div>
      )}
      {PopupFixCar && (
        <div>
          <ServicePopup
            closeWithNextStadyCar={closeWithNextStadyCar}
            closeVisible={close}
            VIN={VIN}
            problems={currentCar.problems!}
          />
        </div>
      )}
      {isVisiblePopupWaitingsCar && (
        <div>
          <InfoWaitingsCars
            closeInfoCar={closeInfoCar}
            car={currentCar!}
            isOpenPopupEdit={openPopupEdit}
          />
        </div>
      )}
    </>
  );
};

export default CarsListWaitingsPopups;
