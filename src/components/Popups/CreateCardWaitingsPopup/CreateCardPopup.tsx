import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import { useTypedDispatch } from "../../../state/hooks/hooks";
import {
  Color,
  ICar,
  TypeBases,
  typesOfActionsCar,
} from "../../../state/types";
import { addData, editData } from "../../../api/database/db";

import styles from "./CreateCardpopup.module.scss";
import UTextField from "../../ui/UTextField/UTextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IEditAndCreatePopupProps {
  VINcar?: string;
  idCar?: number;
  editCarNumber?: string;
  editPhone?: string;
  editEmail?: string;
  editFirstNameOwner?: string;
  editSecondNameOwner?: string;
  editNumberOwners?: number;
  editColor?: Color | string;
  editCarMileage?: string;
  editRegistration?: string;
  editAccidents?: string;
  editProblems?: string;
  closeVisible: (paramVisible: boolean) => void;
}
type FormType = Omit<ICar, "id">;
const CreateCardPopup: React.FC<IEditAndCreatePopupProps> = ({
  closeVisible,
  VINcar,
  idCar,
  editCarNumber,
  editPhone,
  editEmail,
  editFirstNameOwner,
  editSecondNameOwner,
  editNumberOwners,
  editColor,
  editCarMileage,
  editRegistration,
  editAccidents,
  editProblems,
}) => {
  const dispatch = useTypedDispatch();

  const { handleSubmit, control } = useForm<FormType>();

  const IdKey = Math.random() * 100;
  async function submitForm(data: FormType) {
    console.log(data);

    let currentDate = new Date();
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
      id: idCar ?? IdKey,
      numberOwners: data.numberOwners,
      registration: data.registration,
      secondNameOwner: data.secondNameOwner,
      tel: data.tel,
      VIN: data.VIN,
      problems: data.problems,
    };
    if (!VINcar) {
      await addData(TypeBases.CARS_IN_WAITING, thisCar);
      await dispatch({
        type: typesOfActionsCar.ADD_CAR,
        payload: thisCar,
      });
    } else {
      await editData(TypeBases.CARS_IN_WAITING, thisCar, idCar!);
      await dispatch({
        type: typesOfActionsCar.EDIT_CAR,
        payload: thisCar,
      });
    }

    closeVisible(false);
  }

  return (
    <div>
      <div className={styles.createCardPopup}>
        <form className={styles.form} onSubmit={handleSubmit(submitForm)}>
          <h1>Заявление на обслуживание</h1>
          <div className={styles.formInfo}>
            <div className={styles.form_clientInfo}>
              <Controller
                name="firstNameOwner"
                control={control}
                defaultValue={editFirstNameOwner ?? ""}
                rules={{
                  required: "Поле обязательно к заполнению*",
                }}
                render={({ field, fieldState: { error } }) => (
                  <UTextField
                    {...field}
                    error={!!error}
                    helperText={error ? error.message : undefined}
                    textLabel="Имя*"
                  />
                )}
              />
              <Controller
                name="secondNameOwner"
                control={control}
                defaultValue={editSecondNameOwner ?? ""}
                rules={{
                  required: "Поле обязательно к заполнению*",
                }}
                render={({ field, fieldState: { error } }) => (
                  <UTextField
                    {...field}
                    error={!!error}
                    helperText={error ? error.message : undefined}
                    textLabel="Фамилия*"
                  />
                )}
              />
              <Controller
                name="tel"
                control={control}
                defaultValue={editPhone ?? ""}
                rules={{
                  required: "Введите номер телефона*",
                  minLength: {
                    value: 16,
                    message: "Введите номер до конца*",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <UTextField
                    {...field}
                    maxLength="16"
                    error={!!error}
                    helperText={error ? error.message : undefined}
                    textLabel="Телефон*"
                  />
                )}
              />
              <Controller
                name="email"
                control={control}
                defaultValue={editEmail ?? ""}
                rules={{
                  required: "Введите почту*",
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Введите корректную электронную почту*",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <UTextField
                    {...field}
                    error={!!error}
                    helperText={error ? error.message : undefined}
                    type="email"
                    textLabel="Электронная почта*"
                  />
                )}
              />
            </div>

            <div className={styles.form__carInfo}>
              <Controller
                name="VIN"
                control={control}
                defaultValue={VINcar ?? ""}
                rules={{
                  required: "Поле обязательно к заполнению",
                  minLength: {
                    value: 17,
                    message: "Введите семнадцатизначный номер VIN",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <UTextField
                    {...field}
                    maxLength="17"
                    error={!!error}
                    helperText={error ? error.message : undefined}
                    textLabel="VIN*"
                  />
                )}
              />
              <Controller
                name="registration"
                control={control}
                defaultValue={editRegistration ?? ""}
                render={({ field }) => (
                  <UTextField {...field} textLabel="Зарегистрирована" />
                )}
              />
              <Controller
                name="carNumber"
                control={control}
                defaultValue={editCarNumber ?? ""}
                rules={{
                  required: "Введите номер авто",
                  minLength: {
                    value: 6,
                    message: "Введите шестизначный номер авто",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <UTextField
                    {...field}
                    maxLength="6"
                    error={!!error}
                    helperText={error ? error.message : undefined}
                    textLabel="Номер автомобиля*"
                  />
                )}
              />
              <Controller
                name="carMileage"
                control={control}
                defaultValue={editCarMileage ?? ""}
                render={({ field }) => (
                  <UTextField {...field} textLabel="Пробег автомобиля" />
                )}
              />
              <Controller
                name="color"
                control={control}
                defaultValue={editColor ?? ""}
                render={({ field }) => (
                  <UTextField {...field} textLabel="Цвет" />
                )}
              />

              <Controller
                name="numberOwners"
                control={control}
                defaultValue={editNumberOwners ?? 0}
                rules={{
                  required: "Введите число владельцев",
                  pattern: {
                    value: /^([1-9][0-9]{0,1})$/,
                    message:
                      "Введите положительное, корректное число владельцев",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <UTextField
                    {...field}
                    type="number"
                    error={!!error}
                    helperText={error ? error.message : undefined}
                    textLabel="Количество владельцев*"
                  />
                )}
              />

              <Controller
                name="accidents"
                control={control}
                defaultValue={editAccidents ?? ""}
                render={({ field }) => (
                  <UTextField {...field} textLabel="Аварии" />
                )}
              />
            </div>
            <Controller
              name="problems"
              control={control}
              defaultValue={editProblems ?? ""}
              render={({ field }) => (
                <UTextField {...field} textLabel="Ваша пролема" />
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
              Отмена
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
              {VINcar ? "Сохранить" : "Добавить"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCardPopup;
