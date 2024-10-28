import React from "react";
import { Button, Paper } from "@mui/material";
import {
  useTypedDispatch,
  useTypedSelector,
} from "../../../../state/hooks/hooks";

import styles from "./CreateCardpopup.module.scss";
import UTextField from "../../../ui/UTextField/UTextField";
import { Controller, useForm } from "react-hook-form";
import {
  addCarsInWaiting,
  editCarWaiting,
} from "../../../../state/slices/CarsInWaitingsSlice";
import { carsWaitingAPI } from "../../../../pages/CarsWaitings/api/carsWaitingAPI";
import { ICar } from "../../../../pages/CarsWaitings/types";
import { useTranslation } from "react-i18next";
import UTextFieldPhone from "../../../ui/UTextField/UTextFieldPhone";
import { setNewCar } from "../../../../state/slices/CurrentCarSlice";
import { EMPTY_CAR } from "../../../../pages/CarsWaitings/constants/EMPTY_CAR";

interface IEditAndCreatePopupProps {
  closeVisible: (paramVisible: boolean) => void;
}
type FormType = Omit<ICar, "id">;
const CreateCardPopup: React.FC<IEditAndCreatePopupProps> = ({
  closeVisible,
}) => {
  const dispatch = useTypedDispatch();
  const [createCarWaiting] = carsWaitingAPI.useCreateWaitingCarMutation();
  const { handleSubmit, control } = useForm<FormType>();
  const [updateCarWaiting] = carsWaitingAPI.useUpdateWaitingCarMutation();

  const {
    id: idCar,
    VIN: VINcar,
    firstNameOwner: editFirstNameOwner,
    tel: editPhone,
    email: editEmail,
    secondNameOwner: editSecondNameOwner,
    numberOwners: editNumberOwners,
    color: editColor,
    carMileage: editCarMileage,
    carNumber: editCarNumber,
    registration: editRegistration,
    accidents: editAccidents,
    problems: editProblems,
  } = useTypedSelector((state) => state.currentCar);

  const { t } = useTranslation(["translatePopups", "translation"]);

  async function submitForm(data: FormType) {
    const IdKey = Math.round(Math.random() * 1000);
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
    const thisCar = {
      accidents: data.accidents,
      carMileage: data.carMileage,
      carNumber: data.carNumber,
      date: date,
      color: data.color,
      email: data.email,
      firstNameOwner: data.firstNameOwner,
      id: idCar !== 0 ? idCar : IdKey,
      numberOwners: data.numberOwners,
      registration: data.registration,
      secondNameOwner: data.secondNameOwner,
      tel: data.tel,
      VIN: data.VIN,
      problems: data.problems,
    };

    if (idCar === 0) {
      const { data: thisCarNew } = await createCarWaiting(thisCar);
      await dispatch(addCarsInWaiting(thisCarNew as ICar)); //в mokky.dev autoincrement (((
    } else {
      await updateCarWaiting(thisCar);
      await dispatch(editCarWaiting(thisCar));
    }
    setNewCar(EMPTY_CAR);
    closeVisible(false);
  }

  return (
    <div>
      <div className={styles.createCardPopup}>
        <form
          style={{ backgroundColor: "theme.palette.background.paper" }}
          onSubmit={handleSubmit(submitForm)}
        >
          <Paper
            sx={{
              padding: "35px",
              display: "flex",
              flexDirection: "column",
              gap: "30px 10px",
            }}
          >
            <h1>{t("createCarPopup.application")}</h1>
            <div className={styles.formInfo}>
              <div className={styles.form_clientInfo}>
                <Controller
                  name="firstNameOwner"
                  control={control}
                  defaultValue={idCar ? editFirstNameOwner : ""}
                  rules={{
                    required: `${t("createCarPopup.messagesField.required")}`,
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UTextField
                      require
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : undefined}
                      textLabel={`${t("createCarPopup.firstName")}`}
                    />
                  )}
                />
                <Controller
                  name="secondNameOwner"
                  control={control}
                  defaultValue={idCar ? editSecondNameOwner : ""}
                  rules={{
                    required: `${t("createCarPopup.messagesField.required")}`,
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UTextField
                      require
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : undefined}
                      textLabel={`${t("createCarPopup.lastName")}`}
                    />
                  )}
                />
                <Controller
                  name="tel"
                  control={control}
                  defaultValue={idCar ? editPhone : ""}
                  rules={{
                    required: `${t("createCarPopup.messagesField.phone.required")}`,
                    minLength: {
                      value: 16,
                      message: `${t("createCarPopup.messagesField.phone.message")}`,
                    },
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UTextFieldPhone
                      require
                      value={value}
                      onChange={onChange}
                      maxLength="16"
                      error={!!error}
                      helperText={error ? error.message : undefined}
                      textLabel={`${t("createCarPopup.phone")}`}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  defaultValue={idCar ? editEmail : ""}
                  rules={{
                    required: `${t("createCarPopup.messagesField.email.required")}`,
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: `${t("createCarPopup.messagesField.email.message")}`,
                    },
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UTextField
                      require
                      value={value}
                      onChange={onChange}
                      error={!!error}
                      helperText={error ? error.message : undefined}
                      type="email"
                      textLabel={`${t("createCarPopup.email")}`}
                    />
                  )}
                />
              </div>

              <div className={styles.form__carInfo}>
                <Controller
                  name="VIN"
                  control={control}
                  defaultValue={idCar ? VINcar : ""}
                  rules={{
                    required: `${t("createCarPopup.messagesField.required")}`,
                    minLength: {
                      value: 17,
                      message: `${t("createCarPopup.messagesField.VIN.message")}`,
                    },
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UTextField
                      require
                      value={value}
                      onChange={onChange}
                      maxLength="17"
                      error={!!error}
                      helperText={error ? error.message : undefined}
                      textLabel={`${t("createCarPopup.VIN")}`}
                    />
                  )}
                />
                <Controller
                  name="registration"
                  control={control}
                  defaultValue={idCar ? editRegistration : ""}
                  render={({ field: { value, onChange } }) => (
                    <UTextField
                      value={value}
                      onChange={onChange}
                      textLabel={`${t("createCarPopup.registered")}`}
                    />
                  )}
                />
                <Controller
                  name="carNumber"
                  control={control}
                  defaultValue={editCarNumber ?? ""}
                  rules={{
                    required: `${t("createCarPopup.messagesField.carNumber.required")}`,
                    minLength: {
                      value: 6,
                      message: `${t("createCarPopup.messagesField.carNumber.message")}`,
                    },
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UTextField
                      require
                      value={value}
                      onChange={onChange}
                      maxLength="6"
                      error={!!error}
                      helperText={error ? error.message : undefined}
                      textLabel={`${t("createCarPopup.carNumber")}`}
                    />
                  )}
                />
                <Controller
                  name="carMileage"
                  control={control}
                  defaultValue={idCar ? editCarMileage : ""}
                  render={({ field: { value, onChange } }) => (
                    <UTextField
                      value={value}
                      onChange={onChange}
                      textLabel={`${t("createCarPopup.carMileage")}`}
                    />
                  )}
                />
                <Controller
                  name="color"
                  control={control}
                  defaultValue={editColor ?? ""}
                  render={({ field: { value, onChange } }) => (
                    <UTextField
                      value={value}
                      onChange={onChange}
                      textLabel={`${t("createCarPopup.color")}`}
                    />
                  )}
                />

                <Controller
                  name="numberOwners"
                  control={control}
                  defaultValue={idCar ? editNumberOwners : 1}
                  rules={{
                    required: `${t("createCarPopup.messagesField.numberOwners.required")}`,
                    pattern: {
                      value: /^([1-9][0-9]{0,1})$/,
                      message: `${t("createCarPopup.messagesField.numberOwners.message")}`,
                    },
                  }}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => (
                    <UTextField
                      require
                      value={value}
                      onChange={onChange}
                      type="number"
                      error={!!error}
                      helperText={error ? error.message : undefined}
                      textLabel={`${t("createCarPopup.NumberOwners")}`}
                    />
                  )}
                />

                <Controller
                  name="accidents"
                  control={control}
                  defaultValue={idCar ? editAccidents : ""}
                  render={({ field: { value, onChange } }) => (
                    <UTextField
                      value={value}
                      onChange={onChange}
                      textLabel={`${t("createCarPopup.accidents")}`}
                    />
                  )}
                />
              </div>
              <Controller
                name="problems"
                control={control}
                defaultValue={editProblems ?? ""}
                render={({ field: { value, onChange } }) => (
                  <UTextField
                    multiline
                    value={value}
                    onChange={onChange}
                    textLabel={`${t("createCarPopup.problem")}`}
                  />
                )}
              />
            </div>

            <div className={styles.form__footer}>
              <Button
                onClick={() => closeVisible(false)}
                sx={{
                  color: "#705AF8",
                }}
              >
                {t("translation:buttons.cancel")}
              </Button>
              <Button
                type="submit"
                sx={{
                  backgroundColor: "var(--default-color-button)",
                  transition: "var(--default-transition)",
                  "&:hover": {
                    background: "var(--default-color-button-hover)",
                  },
                }}
                variant="contained"
              >
                {VINcar
                  ? `${t("translation:buttons.save")}`
                  : `${t("translation:buttons.add")}`}
              </Button>
            </div>
          </Paper>
        </form>
      </div>
    </div>
  );
};

export default CreateCardPopup;
