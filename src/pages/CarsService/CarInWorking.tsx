import styles from "./CarService.module.scss";
import NoCarList from "../../components/shared/NoCarList/NoCarList";
import SearchInput from "../../components/ui/SearchInput/SearchInput";
import { useCarService } from "./hooks/CarServiceHook";
import { CarsTable } from "./components/CarsTable";
import { Popups } from "./components/CarsServicePopups";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";
import { handleOnExportExcel } from "../CarsWaitings/utils/handleOnExportExcel";
import UButton from "../../components/ui/UButton/UButton";

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
      {cars && !!cars.length && (
        <div className={styles.containerTable}>
          <div className={styles.tableService}>
            <Box sx={{ display: "flex" }}>
              <SearchInput
                onChange={handlerFindWord}
                textLabel={t("translation:search.carsService")}
              />
              <UButton
                onClick={() => handleOnExportExcel(filteredCars)}
                text={"Get To Excel"}
              />
            </Box>

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
