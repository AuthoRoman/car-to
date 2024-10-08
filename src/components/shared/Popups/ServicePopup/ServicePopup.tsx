import { useState } from "react";
import { Button, TextField, Paper } from "@mui/material";

import styles from "./ServicePopup.module.scss";

import decodeVIN from "../../../../api/VIN/VinAPI";

import { addServiceCar } from "../../../../state/slices/ServiceCarSlice";
import { useTypedDispatch } from "../../../../state/hooks/hooks";

import { carsServiceAPI } from "../../../../pages/CarsService/api/CarsServiceAPI";
import { cardService } from "../../../../pages/CarsService/types";
import { deleteWaitingCar } from "../../../../state/slices/CarsInWaitingsSlice";
import { carsWaitingAPI } from "../../../../pages/CarsWaitings/api/carsWaitingAPI";
import { ICar } from "../../../../pages/CarsWaitings/types";
import { useTranslation } from "react-i18next";
import { getLocaleCarInfo } from "../../../../core/utils/localeInfoCar";

const ServicePopup: React.FC<{
  closeVisible: (parampopup: boolean) => void;
  car: ICar;
  problems: string;
  closeWithNextStadyCar: () => void;
}> = ({ closeVisible, car, problems, closeWithNextStadyCar }) => {
  const VIN = car.VIN;
  const dispatch = useTypedDispatch();

  const [nameMaster, setNameMaster] = useState("");
  const [createCarService] = carsServiceAPI.useCreateCarServiceMutation();
  const [deleteData] = carsWaitingAPI.useDeleteWaitingCarMutation();
  async function submitForm(VIN: string, name: string, problems: string) {
    const currentDate = new Date();
    const date = `${
      currentDate.getDate() < 10
        ? "0" + currentDate.getDate()
        : currentDate.getDate()
    }.${
      currentDate.getMonth() < 10
        ? "0" + (currentDate.getMonth() + 1)
        : currentDate.getMonth()
    }.${currentDate.getFullYear()}`;
    const data = decodeVIN(VIN);

    if (data) {
      const thisCar = {
        id: car.id,
        VIN: VIN,
        region: data.region,
        country: data.country,
        date: date,
        manufacturer: data.manufacturer,
        vehicleAttributes: data.vehicleAttributes,
        checkDigit: data.checkDigit,
        modelYear: data.modelYear,
        assemblyPlant: data.assemblyPlant,
        serialNumber: data.serialNumber,
        nameMaster: name,
        problems: problems,
      };
      await deleteData(car.id);

      const { data: newCarServiceWithId } = await createCarService(thisCar);

      dispatch(deleteWaitingCar(car.VIN));

      dispatch(addServiceCar(newCarServiceWithId as cardService));
      closeWithNextStadyCar();
    }
    if (!data) {
      alert("no data");
    }
  }

  const { t } = useTranslation(["translatePopups", "translation"]);

  return (
    <div>
      <div className={styles.createCardPopup}>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
          action=""
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              borderRadius: "5px",
              padding: "35px",

              height: "fit-content",
              width: "500px",
            }}
          >
            <h1>{t("ServicePopup.title")}</h1>

            <TextField
              value={nameMaster}
              onChange={(e) => setNameMaster(e.target.value)}
              className={styles.inputPhoneCustom}
              placeholder={t("ServicePopup.inputPlaceholder")}
              color="primary"
            />

            <div className={styles.form__footer}>
              <Button
                onClick={() => closeVisible(false)}
                sx={{
                  color: "var(--default-color-button)",
                }}
              >
                {t("translation:buttons.cancel")}
              </Button>
              <Button
                disabled={!nameMaster.trim().length}
                onClick={() =>
                  submitForm(VIN, nameMaster, problems ? problems : "")
                }
                sx={{
                  backgroundColor: "var(--default-color-button)",
                  transition: "var(--default-transition)",
                  "&:hover": {
                    background: "var(--default-color-button-hover)",
                  },
                }}
                variant="contained"
              >
                {t("translation:buttons.send")}
              </Button>
            </div>
          </Paper>
        </form>
      </div>
    </div>
  );
};

export default ServicePopup;
