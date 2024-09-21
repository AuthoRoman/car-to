import NoCarList from "../../components/NoCarList/NoCarList";

import styles from "./CarsListWaiting.module.scss";
import SearchInput from "../../components/ui/SearchInput/SearchInput";
import ButtonPlus from "../../components/ui/ButtonPlus/ButtonPlus";
import { useCarListWaitingHook } from "./CarListWaitingHook";
import CarsListWaitingsPopups from "./CarsListWaitingsPopups";
import { CarsTable } from "./CarsTableWaitingsCar";

import { useTranslation } from "react-i18next";

const CarsListWaiting = () => {
  const { t } = useTranslation("translateWaitCar");
  const {
    deleteCar,
    close,
    closeInfoCar,
    closeWithNextStadyCar,
    closeEditor,
    getInfocar,
    OpenPopupEdit,
    handlerChangeDefaultState,
    filteredCars,
    handleServicePop,
    handlerFindWord,
    isVisiblePopup,
    isVisiblePopupWaitingsCar,
    openPopupCreateCars,
    isOpenPopupEdit,
    PopupFixCar,
    currentCar,
    cars,
    upStateSort,
    sortState,
    car,
    CurrentCarId,
    isLoading,
  } = useCarListWaitingHook();
  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <CarsListWaitingsPopups
          close={close}
          isVisiblePopup={isVisiblePopup}
          isOpenPopupEdit={isOpenPopupEdit}
          PopupFixCar={PopupFixCar}
          isVisiblePopupWaitingsCar={isVisiblePopupWaitingsCar}
          currentCar={currentCar!}
          CurrentCarId={CurrentCarId!}
          VIN={car.VIN}
          accidents={car.accidents}
          carMileage={car.carMileage}
          carNumber={car.carNumber}
          color={car.color}
          email={car.email}
          firstNameOwner={car.firstNameOwner}
          secondNameOwner={car.secondNameOwner}
          numberOwners={car.numberOwners!}
          tel={car.tel!}
          problems={car.problems}
          registration={car.registration}
          closeEditor={closeEditor}
          closeWithNextStadyCar={closeWithNextStadyCar}
          openPopupEdit={OpenPopupEdit}
          closeInfoCar={closeInfoCar}
        />
        {!cars.length && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100vw",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginLeft: "65px",
              }}
            >
              <NoCarList text={t("noCarWaitingsCar")} />
            </div>
            <ButtonPlus onClick={() => openPopupCreateCars()} height="55px" />
          </div>
        )}

        {!isLoading && cars.length > 0 && (
          <div className={styles.tableWaitngList}>
            <div className={styles.tableWaitngList__findForm}>
              <SearchInput
                onChange={handlerFindWord}
                textLabel="Поиск: номер авто/имя фамилия"
              />
              <ButtonPlus onClick={() => openPopupCreateCars()} />
            </div>

            <CarsTable
              deleteCar={deleteCar}
              filteredCars={filteredCars}
              getInfocar={getInfocar}
              handleServicePop={handleServicePop}
              handlerChangeDefaultState={handlerChangeDefaultState}
              sortState={sortState}
              upStateSort={upStateSort}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CarsListWaiting;
