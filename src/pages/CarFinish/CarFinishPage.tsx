import styles from "./CarFinishPage.module.scss";

import NoCarList from "../../components/NoCarList/NoCarList";
import InfoPopupCars from "../../components/Popups/InfoAboutCarsPopup/InfoPopupCar/InfoPopupCars";
import SearchInput from "../../components/ui/SearchInput/SearchInput";
import { useCarFinishHook } from "./CarFinishHook";
import CarFinishTable from "./CarFinishTable";

export default function CarFinishComponent() {
  const {
    isPopupInfoFinishCarOpen,
    closePopup,
    currentCar,
    cars,
    handlerFindWord,
    handlerChangeDefaultState,
    sortState,
    upStateSort,
    filteredCars,
    getInfo,
    deleteHandler,
  } = useCarFinishHook();

  return (
    <div>
      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        {isPopupInfoFinishCarOpen && (
          <div>
            <InfoPopupCars car={currentCar!} closeInfoCar={closePopup} />
          </div>
        )}
        {cars.length === 0 ? (
          <div className={styles.nocars}>
            <NoCarList text="Готовых машин пока нет" />
          </div>
        ) : (
          <div className={styles.withcar}>
            <div className={styles.tableFinish}>
              <div>
                <SearchInput
                  onChange={handlerFindWord}
                  textLabel="Поиск: имя мастера"
                />
              </div>
              <CarFinishTable
                deleteHandler={deleteHandler}
                filteredCars={filteredCars}
                getInfo={getInfo}
                handlerChangeDefaultState={handlerChangeDefaultState}
                sortState={sortState}
                upStateSort={upStateSort}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
