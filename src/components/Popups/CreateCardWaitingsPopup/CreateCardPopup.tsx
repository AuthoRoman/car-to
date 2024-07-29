import React, { useCallback, useState } from "react";
import { Button, TextField } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useTypedDispatch } from "../../../state/hooks/hooks";
import { Color, TypeBases, typesOfActionsCar } from "../../../state/types";
import { addData, editData } from "../../../api/database/db";

import styles from "./CreateCardpopup.module.scss";

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
  closeVisible: (paramVisible: boolean)=>void;
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

  const [carNumber, setCarNumber] = useState<string>(editCarNumber ?? "");

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
  const [color, setColor] = useState<Color | string>(editColor ?? "");
  const [carMileage, setCarMileage] = useState(editCarMileage ?? "");
  const [registration, setRegistration] = useState(editRegistration ?? "");
  const [VIN, setVIN] = useState(VINcar ?? "");
  const [accidents, setAccidents] = useState(editAccidents ?? "");
  const [problems, setProblems] = React.useState(editProblems ?? "");

  function handlePhone(newValue: string) {
    if (newValue.length === 16) {
      setPhoneError(false);
    }
    setPhone(newValue);
  }

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

    if (!/^[\w- ]{6,6}$/g.test(carNumber)) {
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
      /^[\w- ]{6,6}$/g.test(carNumber)
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
          accidents: accidents,
          carMileage: carMileage,
          carNumber: carNumber,
          date: date,
          color: color,
          email: email,
          firstNameOwner: firstNameOwner,
          id: IdKey,
          numberOwners: numberOwners,
          registration: registration,
          secondNameOwner: secondNameOwner,
          tel: phone,
          VIN: VINcar ?? VIN,
          problems: problems,
        });
        await dispatch({
          type: typesOfActionsCar.ADD_CAR,
          payload: {
            accidents: accidents,
            carMileage: carMileage,
            carNumber: carNumber,
            date: date,
            color: color,
            email: email,
            firstNameOwner: firstNameOwner,
            id: IdKey,
            numberOwners: numberOwners!,
            registration: registration,
            secondNameOwner: secondNameOwner,
            tel: phone,
            VIN: VINcar ?? VIN,
            problems: problems!,
          },
        });
      } else {
        await editData(
          TypeBases.CARS_IN_WAITING,
          {
            accidents: accidents,
            carMileage: carMileage,
            carNumber: carNumber,
            date: date,
            color: color,
            email: email,
            firstNameOwner: firstNameOwner,
            id: idCar,
            numberOwners: numberOwners,
            registration: registration,
            secondNameOwner: secondNameOwner,
            tel: phone,
            VIN: VIN,
            problems: problems,
          },
          idCar!
        );
        await dispatch({
          type: typesOfActionsCar.EDIT_CAR,
          payload: {
            accidents: accidents,
            carMileage: carMileage,
            carNumber: carNumber,
            date: date,
            color: color,
            email: email,
            firstNameOwner: firstNameOwner,
            id: idCar!,
            numberOwners: numberOwners!,
            registration: registration,
            secondNameOwner: secondNameOwner,
            tel: phone,
            VIN: VIN,
            problems: problems!,
          },
        });
      }

      closeVisible(false);
    }
    return 0;
  }

  const ValidationFirstNameOwner = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstNameOwner(e.target.value);
    setNameError(false);
  };
  const ValidationSecondNameOwner = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondNameOwner(e.target.value);

    setSecondnameError(false);
  };
  const ValidationVIN = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(VIN);
    setVIN(e.target.value);
    setVINError(false);
  };

  const ValidationNumberOwners = useCallback((
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (
      event.target.value !== null &&
      Number(event.target.value) === parseInt(event.target.value)
    ) {
      setNumberOwners(Number(event.target.value));
      setNumbersOwnersError(false);
    }
  },[]);

  const ValidationEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    setEmail(e.target.value);
    if (pattern.test(e.target.value)) {
      setEmailError(false);
    }
  },[]);

 

  return (
    <div>
      <div className={styles.createCardPopup}>
        <form className={styles.form} action="">
          <h1>Заявление на обслуживание</h1>
          <div className={styles.formInfo}>
            <div className={styles.form_clientInfo}>
              <TextField
                size="small"
                value={firstNameOwner}
                error={
                  nameError && firstNameOwner.trim().length === 0 ? true : false
                }
                helperText={
                  nameError && firstNameOwner.trim().length === 0
                    ? "Введите имя*"
                    : false
                }
                onChange={ValidationFirstNameOwner}
                sx={{
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
                placeholder="Имя*"
                label="Имя*"
                color="primary"
              />

              <TextField
                size="small"
                value={secondNameOwner}
                error={
                  secondNameError && secondNameOwner.trim().length === 0
                    ? true
                    : false
                }
                helperText={
                  secondNameError && secondNameOwner.trim().length === 0
                    ? "Введите фамилию*"
                    : false
                }
                onChange={ValidationSecondNameOwner}
                sx={{
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
                placeholder="Фамилия*"
                label="Фамилия*"
                color="primary"
              />
              <MuiTelInput
                inputProps={{ maxLength: 16 }}
                size="small"
                value={phone}
                onChange={handlePhone}
                sx={{
                  backgroundColor: "white",
                }}
                error={phoneError ? true : false}
                helperText={
                  phoneError ? "Введите корректный номер телефона*" : false
                }
                label="Телефон*"
                color="primary"
              />
              <TextField
                size="small"
                value={email}
                onChange={ValidationEmail}
                error={emailError ? true : false}
                helperText={
                  emailError ? "Введите корректную электронную почту*" : false
                }
                inputProps={{
                  type: "email",
                }}
                sx={{
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
                label="Электронная почта*"
                color="primary"
              />
            </div>
            <div className={styles.form__carInfo}>
              <TextField
                size="small"
                inputProps={{ maxLength: 17 }}
                value={VIN}
                error={VINError && VIN.trim().length !== 17 ? true : false}
                helperText={
                  VINError && VIN.trim().length !== 17
                    ? "Введите 17 символов VIN*"
                    : false
                }
                onChange={ValidationVIN}
                sx={{
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
                label="VIN*"
                color="primary"
              />
              <TextField
                size="small"
                value={registration}
                onChange={(e) => setRegistration(e.target.value)}
                sx={{
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
                label="Зарегистрирована"
              />
              <TextField
                size="small"
                value={carNumber}
                inputProps={{ maxLength: 6 }}
                onChange={(e) => setCarNumber(e.target.value)}
                error={
                  carNumberError && carNumber.trim().length !== 6 ? true : false
                }
                helperText={
                  carNumberError && carNumber.trim().length !== 6
                    ? "Введите корректный номер авто"
                    : false
                }
                sx={{
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
                label="Номер автомобиля*"
                color="primary"
              />
              <TextField
                size="small"
                value={carMileage}
                onChange={(e) => setCarMileage(e.target.value)}
                sx={{
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
                label="Пробег автомобиля"
                color="primary"
              />
              <TextField
                size="small"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                sx={{
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
                color="primary"
                label="Цвет"
              />
              <TextField
                size="small"
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
                    : false
                }
                onChange={ValidationNumberOwners}
                label="Количество владельцев*"
                value={numberOwners}
                color="primary"
                inputProps={{ type: "number" }}
                sx={{
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
              />

              <TextField
                size="small"
                value={accidents}
                onChange={(e) => setAccidents(e.target.value)}
                sx={{
                  borderRadius: "5px",

                  backgroundColor: "white",
                }}
                label="Аварии"
                color="primary"
              />
            </div>
            <TextField
              size="small"
              value={problems}
              onChange={(e) => setProblems(e.target.value)}
              sx={{
                borderRadius: "5px",

                backgroundColor: "white",
              }}
              label="Ваша пролема"
              id="standard-multiline-static"
              rows={4}
              multiline
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
