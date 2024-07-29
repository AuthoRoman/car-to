import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useTypedDispatch } from "../../../state/hooks/hooks";
import { Color, TypeBases, typesOfActionsCar } from "../../../state/types";
import { addData, editData } from "../../../api/database/db";

import styles from "./CreateCardpopup.module.scss";
import UTextField from "../../ui/UTextField/UTextField";
import { useDefaultInput } from "../../../state/hooks/useDefaultInput";

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

  const [nameError, setNameError] = useState<boolean>(false);
  const [secondNameError, setSecondnameError] = useState<boolean>(false);
  const [ownerNumbersError, setNumbersOwnersError] = useState<boolean>(false);
  const [VINError, setVINError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [carNumberError, setCarNumberError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const [phone, setPhone] = useState(editPhone ?? "");
  const [email, setEmail] = useState(editEmail ?? "");
  const [firstNameOwner, setFirstNameOwner] = useState<string>(
    editFirstNameOwner ?? ""
  );
  const [secondNameOwner, setSecondNameOwner] = useState<string>(
    editSecondNameOwner ?? ""
  );
  const [numberOwners, setNumberOwners] = useState<number | null>(
    editNumberOwners ?? null
  );
  const [VIN, setVIN] = useState(VINcar ?? "");

  const color = useDefaultInput(editColor ?? "");
  const carMileage = useDefaultInput(editCarMileage ?? "");
  const registration = useDefaultInput(editRegistration ?? "");
  const carNumber = useDefaultInput(editCarNumber ?? "");
  const accidents = useDefaultInput(editAccidents ?? "");
  const problems = useDefaultInput(editProblems ?? "");

  const IdKey = Math.random() * 100;
  async function submitForm() {
    if (VIN.length !== 17) {
      setVINError(true);
    }
    if (firstNameOwner.trim().length === 0) {
      setNameError(true);
    }
    if (secondNameOwner.trim().length === 0) {
      setSecondnameError(true);
    }
    if (
      numberOwners! <= 0 ||
      numberOwners === undefined ||
      numberOwners === null ||
      typeof numberOwners !== "number"
    ) {
      setNumbersOwnersError(true);
    }
    if (
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,23}$/g.test(email) ||
      email.trim().length === 0
    ) {
      console.log(emailError);
      setEmailError(true);
    }

    if (!/^[\w- ]{6,6}$/g.test(carNumber.value)) {
      setCarNumberError(true);
    }
    if (phone.length !== 16) {
      setPhoneError(true);
    }
    if (
      VIN.length === 17 &&
      phone.length === 16 &&
      firstNameOwner.trim().length !== 0 &&
      secondNameOwner.trim().length !== 0 &&
      numberOwners! > 0 &&
      numberOwners !== undefined &&
      numberOwners !== null &&
      typeof numberOwners === "number" &&
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,23}$/g.test(email) &&
      email.trim().length !== 0 &&
      /^[\w- ]{6,6}$/g.test(carNumber.value)
    ) {
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
      if (!VINcar) {
        await addData(TypeBases.CARS_IN_WAITING, {
          accidents: accidents.value,
          carMileage: carMileage.value,
          carNumber: carNumber.value,
          date: date,
          color: color.value,
          email: email,
          firstNameOwner: firstNameOwner,
          id: IdKey,
          numberOwners: numberOwners,
          registration: registration.value,
          secondNameOwner: secondNameOwner,
          tel: phone,
          VIN: VINcar ?? VIN,
          problems: problems.value,
        });
        await dispatch({
          type: typesOfActionsCar.ADD_CAR,
          payload: {
            accidents: accidents.value,
            carMileage: carMileage.value,
            carNumber: carNumber.value,
            date: date,
            color: color.value,
            email: email,
            firstNameOwner: firstNameOwner,
            id: IdKey,
            numberOwners: numberOwners!,
            registration: registration.value,
            secondNameOwner: secondNameOwner,
            tel: phone,
            VIN: VINcar ?? VIN,
            problems: problems.value!,
          },
        });
      } else {
        await editData(
          TypeBases.CARS_IN_WAITING,
          {
            accidents: accidents.value,
            carMileage: carMileage.value,
            carNumber: carNumber.value,
            date: date,
            color: color.value,
            email: email,
            firstNameOwner: firstNameOwner,
            id: idCar,
            numberOwners: numberOwners,
            registration: registration.value,
            secondNameOwner: secondNameOwner,
            tel: phone,
            VIN: VIN,
            problems: problems.value,
          },
          idCar!
        );
        await dispatch({
          type: typesOfActionsCar.EDIT_CAR,
          payload: {
            accidents: accidents.value,
            carMileage: carMileage.value,
            carNumber: carNumber.value,
            date: date,
            color: color.value,
            email: email,
            firstNameOwner: firstNameOwner,
            id: idCar!,
            numberOwners: numberOwners!,
            registration: registration.value,
            secondNameOwner: secondNameOwner,
            tel: phone,
            VIN: VIN,
            problems: problems.value!,
          },
        });
      }

      closeVisible(false);
    }
    return 0;
  }

  const ValidationFirstNameOwner = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFirstNameOwner(e.target.value);
      setNameError(false);
    },
    []
  );

  const ValidationHandlePhone = useCallback(
    (value: string) => {
      if (phone.length === 15) {
        setPhoneError(false);
      }
      setPhone(value);
    },
    [phone.length]
  );

  const ValidationSecondNameOwner = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSecondNameOwner(e.target.value);
      setSecondnameError(false);
    },
    []
  );

  const ValidationVIN = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setVIN(e.target.value);
      setVINError(false);
    },
    []
  );

  const ValidationNumberOwners = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      console.log("owner");
      event.preventDefault();
      if (
        event.target.value !== null &&
        Number(event.target.value) === parseInt(event.target.value)
      ) {
        setNumberOwners(Number(event.target.value));
        setNumbersOwnersError(false);
      }
    },
    []
  );

  const ValidationEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const pattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
      setEmail(e.target.value);
      if (pattern.test(e.target.value)) {
        setEmailError(false);
      }
    },
    []
  );

  return (
    <div>
      <div className={styles.createCardPopup}>
        <form className={styles.form} action="">
          <h1>Заявление на обслуживание</h1>
          <div className={styles.formInfo}>
            <div className={styles.form_clientInfo}>
              <UTextField
                value={firstNameOwner}
                error={
                  nameError && firstNameOwner.trim().length === 0 ? true : false
                }
                helperText={
                  nameError && firstNameOwner.trim().length === 0
                    ? "Введите имя*"
                    : ""
                }
                onChange={ValidationFirstNameOwner}
                textLabel="Имя*"
              />

              <UTextField
                value={secondNameOwner}
                error={
                  secondNameError && secondNameOwner.trim().length === 0
                    ? true
                    : false
                }
                helperText={
                  secondNameError && secondNameOwner.trim().length === 0
                    ? "Введите фамилию*"
                    : ""
                }
                onChange={ValidationSecondNameOwner}
                textLabel="Фамилия*"
              />
              <UTextField
                maxLength="16"
                value={phone}
                onChange={ValidationHandlePhone as () => string}
                error={phoneError ? true : false}
                helperText={
                  phoneError ? "Введите корректный номер телефона*" : ""
                }
                textLabel="Телефон*"
              />
              <UTextField
                value={email}
                onChange={ValidationEmail}
                error={emailError ? true : false}
                helperText={
                  emailError ? "Введите корректную электронную почту*" : ""
                }
                type="email"
                textLabel="Электронная почта*"
              />
            </div>
            <div className={styles.form__carInfo}>
              <UTextField
                maxLength="17"
                value={VIN}
                error={VINError && VIN.trim().length !== 17 ? true : false}
                helperText={
                  VINError && VIN.trim().length !== 17
                    ? "Введите 17 символов VIN*"
                    : ""
                }
                onChange={ValidationVIN}
                textLabel="VIN*"
              />
              <UTextField
                onChange={registration.onChange}
                value={registration.value}
                textLabel="Зарегистрирована"
              />

              <UTextField
                {...carNumber}
                maxLength="6"
                error={
                  carNumberError && carNumber.value.trim().length !== 6
                    ? true
                    : false
                }
                helperText={
                  carNumberError && carNumber.value.trim().length !== 6
                    ? "Введите корректный номер авто"
                    : ""
                }
                textLabel="Номер автомобиля*"
              />
              <UTextField {...carMileage} textLabel="Пробег автомобиля" />
              <UTextField {...color} textLabel="Цвет" />
              <UTextField
                error={
                  ownerNumbersError &&
                  (numberOwners === 0 ||
                    numberOwners === undefined ||
                    numberOwners === null)
                    ? true
                    : false
                }
                helperText={
                  ownerNumbersError &&
                  (numberOwners === 0 ||
                    numberOwners === undefined ||
                    numberOwners === null)
                    ? "Введите корректное число владельцев*"
                    : ""
                }
                onChange={ValidationNumberOwners}
                textLabel="Количество владельцев*"
                value={numberOwners!}
              />

              <UTextField {...accidents} textLabel="Аварии" />
            </div>
            <UTextField {...problems} textLabel="Ваша пролема" />
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
              onClick={submitForm}
              sx={{
                backgroundColor: "#705AF8",
                "&:hover": {
                  background: "#7975F8",
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
