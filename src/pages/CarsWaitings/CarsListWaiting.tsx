import NoCarList from "../../components/NoCarList/NoCarList";

import styles from "./CarsListWaiting.module.scss";
import SearchInput from "../../components/ui/SearchInput/SearchInput";
import ButtonPlus from "../../components/ui/ButtonPlus/ButtonPlus";
import { useCarListWaitingHook } from "./CarListWaitingHook";
import CarsListWaitingsPopups from "./CarsListWaitingsPopups";
import { CarsTable } from "./CarsTableWaitingsCar";

const CarsListWaiting = () => {
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
    firstNameOwner,
    secondNameOwner,
    accidents,
    carMileage,
    carNumber,
    color,
    email,
    numberOwners,
    problems,
    registration,
    tel,
    VIN,
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
          VIN={VIN}
          accidents={accidents}
          carMileage={carMileage}
          carNumber={carNumber}
          color={color}
          email={email}
          firstNameOwner={firstNameOwner}
          secondNameOwner={secondNameOwner}
          numberOwners={numberOwners!}
          tel={tel!}
          problems={problems}
          registration={registration}
          closeEditor={closeEditor}
          closeWithNextStadyCar={closeWithNextStadyCar}
          openPopupEdit={OpenPopupEdit}
          closeInfoCar={closeInfoCar}
        />
        {(!cars.length || isLoading) && (
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
              <NoCarList
                text={'Нет автомобилей в очереди, чтобы добавить нажми на "+"'}
              />
            </div>

            <ButtonPlus onClick={() => openPopupCreateCars()} height="55px" />
          </div>
        )}

        {cars && cars.length && (
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
        <div></div>
      </div>
    </div>
  );
};

export default CarsListWaiting;
