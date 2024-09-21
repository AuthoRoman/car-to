import styles from "./CarService.module.scss";
import NoCarList from "../../components/NoCarList/NoCarList";
import SearchInput from "../../components/ui/SearchInput/SearchInput";
import { useCarService } from "./CarService";
import { CarsTable } from "./CarsTable";
import { Popups } from "./CarsServicePopups";
import { useTranslation } from "react-i18next";

const CarinWorking: React.FC = () => {
  const {
    handlerChangeDefaultState,
    togglePopup,
    closeInfoCar,
    isOpen,
    currentCar,
    isOpenServiceInfo,
    cars,
    handlerFindWord,
    upStateSort,
    filteredCars,
    getInfoServiceCard,
    funSetCurrentCar,
    sortState,
  } = useCarService();

  const { t } = useTranslation("translateServiceCar");

  return (
    <div>
      <Popups
        isOpen={isOpen}
        isOpenServiceInfo={isOpenServiceInfo}
        currentCar={currentCar}
        togglePopup={togglePopup}
        closeInfoCar={closeInfoCar}
      />

      {/* Если нет машин */}
      {!cars.length && (
        <div className={styles.inServicPage}>
          <NoCarList text={`${t("noCarService")}`} />
        </div>
      )}

      {/* Если машины есть */}
      {cars && cars.length && (
        <div className={styles.containerTable}>
          <div className={styles.tableService}>
            <SearchInput
              onChange={handlerFindWord}
              textLabel="Поиск: имя мастера"
            />
            <CarsTable
              filteredCars={filteredCars}
              sortState={sortState}
              upStateSort={upStateSort}
              handlerChangeDefaultState={handlerChangeDefaultState}
              getInfoServiceCard={getInfoServiceCard}
              funSetCurrentCar={funSetCurrentCar}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CarinWorking;
