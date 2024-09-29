import React from "react";
import { Button } from "@mui/material";
import { useTypedDispatch, useTypedSelector } from "../../../state/hooks/hooks";

import styles from "./CreateCardpopup.module.scss";
import UTextField from "../../ui/UTextField/UTextField";
import { Controller, useForm } from "react-hook-form";
import {
  addCarsInWaiting,
  editCarWaiting,
} from "../../../state/slices/CarsInWaitingsSlice";
import { carsWaitingAPI } from "../../../pages/CarsWaitings/api/carsWaitingAPI";
import { ICar } from "../../../pages/CarsWaitings/types";
import { useTranslation } from "react-i18next";
import UTextFieldPhone from "../../ui/UTextField/UTextFieldPhone";
import resetCurrentCar from "../../../pages/CarsWaitings/utils/resetCurrentCar";
import { setNewCar } from "../../../state/slices/CurrentCarSlice";
import { EMPTY_CAR } from "../../../pages/CarsWaitings/constants/EMPTY_CAR";

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

  const { t } = useTranslation(["translateCreatePopup", "translation"]);

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
      console.log("create");

      const { data: thisCarNew } = await createCarWaiting(thisCar);
      console.log(thisCarNew);
      await dispatch(addCarsInWaiting(thisCarNew as ICar));
    } else {
      await updateCarWaiting(thisCar);
      await dispatch(editCarWaiting(thisCar));
    }
    setNewCar(EMPTY_CAR);
    closeVisible(false);
  }
  console.log(idCar);
  return (
    <div>
      <div className={styles.createCardPopup}>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <h1>{t("application")}</h1>
          <div className={styles.formInfo}>
            <div className={styles.form_clientInfo}>
              <Controller
                name="firstNameOwner"
                control={control}
                defaultValue={!!idCar ? editFirstNameOwner : ""}
                rules={{
                  required: `${t("messagesField.required")}`,
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
                    textLabel={`${t("firstName")}`}
                  />
                )}
              />
              <Controller
                name="secondNameOwner"
                control={control}
                defaultValue={!!idCar ? editSecondNameOwner : ""}
                rules={{
                  required: `${t("messagesField.required")}`,
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
                    textLabel={`${t("lastName")}`}
                  />
                )}
              />
              <Controller
                name="tel"
                control={control}
                defaultValue={!!idCar ? editPhone : ""}
                rules={{
                  required: `${t("messagesField.phone.required")}`,
                  minLength: {
                    value: 16,
                    message: `${t("messagesField.phone.message")}`,
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
                    textLabel={`${t("phone")}`}
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue={!!idCar ? editEmail : ""}
                rules={{
                  required: `${t("messagesField.email.required")}`,
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: `${t("messagesField.email.message")}`,
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
                    textLabel={`${t("email")}`}
                  />
                )}
              />
            </div>

            <div className={styles.form__carInfo}>
              <Controller
                name="VIN"
                control={control}
                defaultValue={!!idCar ? VINcar : ""}
                rules={{
                  required: `${t("messagesField.required")}`,
                  minLength: {
                    value: 17,
                    message: `${t("messagesField.VIN.message")}`,
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
                    textLabel={`${t("VIN")}`}
                  />
                )}
              />
              <Controller
                name="registration"
                control={control}
                defaultValue={!!idCar ? editRegistration : ""}
                render={({ field: { value, onChange } }) => (
                  <UTextField
                    value={value}
                    onChange={onChange}
                    textLabel={`${t("registered")}`}
                  />
                )}
              />
              <Controller
                name="carNumber"
                control={control}
                defaultValue={editCarNumber ?? ""}
                rules={{
                  required: `${t("messagesField.carNumber.required")}`,
                  minLength: {
                    value: 6,
                    message: `${t("messagesField.carNumber.message")}`,
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
                    textLabel={`${t("carNumber")}`}
                  />
                )}
              />
              <Controller
                name="carMileage"
                control={control}
                defaultValue={!!idCar ? editCarMileage : ""}
                render={({ field: { value, onChange } }) => (
                  <UTextField
                    value={value}
                    onChange={onChange}
                    textLabel={`${t("carMileage")}`}
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
                    textLabel={`${t("color")}`}
                  />
                )}
              />

              <Controller
                name="numberOwners"
                control={control}
                defaultValue={!!idCar ? editNumberOwners : 1}
                rules={{
                  required: `${t("messagesField.numberOwners.required")}`,
                  pattern: {
                    value: /^([1-9][0-9]{0,1})$/,
                    message: `${t("messagesField.numberOwners.message")}`,
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
                    textLabel={`${t("NumberOwners")}`}
                  />
                )}
              />

              <Controller
                name="accidents"
                control={control}
                defaultValue={!!idCar ? editAccidents : ""}
                render={({ field: { value, onChange } }) => (
                  <UTextField
                    value={value}
                    onChange={onChange}
                    textLabel={`${t("accidents")}`}
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
                  textLabel={`${t("problem")}`}
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
        </form>
      </div>
    </div>
  );
};

export default CreateCardPopup;
