import NoCarList from "../../components/shared/NoCarList/NoCarList";

import styles from "./CarsListWaiting.module.scss";
import SearchInput from "../../components/ui/SearchInput/SearchInput";
import ButtonPlus from "../../components/ui/ButtonPlus/ButtonPlus";
import { useCarListWaitingHook } from "./hooks/CarListWaitingHook";
import CarsListWaitingsPopups from "./components/CarsListWaitingsPopups";
import { CarsTable } from "./components/CarsTableWaitingsCar";

import { useTranslation } from "react-i18next";
import { handleOnExportExcel } from "./utils/handleOnExportExcel";
import UButton from "../../components/ui/UButton/UButton";

const CarsListWaiting = () => {
  const { t } = useTranslation(["translateWaitCar", "translation"]);
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
    cars,
    upStateSort,
    sortState,
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
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginLeft: "64px",
              }}
            >
              <NoCarList text={t("noCarWaitingsCar")} />
            </div>
            <ButtonPlus
              onClick={() => openPopupCreateCars()}
              height="var(--buttonplus-height-withoutcar)"
            />
          </div>
        )}

        {!isLoading && !!cars.length && (
          <div className={styles.tableWaitngList}>
            <div className={styles.tableWaitngList__findForm}>
              <SearchInput
                onChange={handlerFindWord}
                textLabel={t("translation:search.carsWaiting")}
              />
              <ButtonPlus onClick={openPopupCreateCars} />
              <UButton
                onClick={() => handleOnExportExcel(filteredCars)}
                text={"Get To Excel"}
              />
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
