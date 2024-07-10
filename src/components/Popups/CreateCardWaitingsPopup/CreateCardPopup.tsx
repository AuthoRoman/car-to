import React, { useState } from "react";
import styles from "./CreateCardpopup.module.css";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Input,
  TextField,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useTypedDispatch, useTypedSelector } from "../../../state/hooks/hooks";
import { Color, TypeBases, typesOfActionsCar } from "../../../state/types";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { addData, editData } from "../../../api/database/db";
import { Height } from "@mui/icons-material";



const CreateCardPopup: React.FC<{VINcar?:string; idCar?:number;  closeVisible: any }> = ({ closeVisible,VINcar,idCar }) => {
  const dispatch = useTypedDispatch();

  const [nameError, setNameError] = useState<boolean>(false);
  const [secondNameError, setSecondnameError] = useState<boolean>(false);
  const [ownerNumbersError, setNumbersOwnersError] = useState<boolean>(false);
  const [VINError, setVINError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [carNumberError, setCarNumberError] = useState<boolean>(false)

  const [carNumber, setCarNumber] = useState<string>("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameOwner, setFirstNameOwner] = useState<string>("");
  const [secondNameOwner, setSecondNameOwner] = useState<string>("");
  const [numberOwners, setNumberOwners] = useState<number>();
  const [color, setColor] = useState<Color | string>("");
  const [carMileage, setCarMileage] = useState("");
  const [registration, setRegistration] = useState("");
  const [VIN, setVIN] = useState("");
  const [accidents, setAccidents] = useState("");
  const [problems, setProblems] = React.useState("");

  function handlePhone(newValue: any) {
    return setPhone(newValue);
  }

  const IdKey = Math.random() * 100;
  async function submitForm() {
    if (VIN.length !== 17 && !VINcar) {
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
    if(!/^[\w- ]{6,6}$/g.test(carNumber)){
      setCarNumberError(true)
    }
    if (
      (VIN.length === 17 || VINcar )&&
      firstNameOwner.trim().length !== 0 &&
      secondNameOwner.trim().length !== 0 &&
      numberOwners! > 0 &&
      numberOwners !== undefined &&
      numberOwners !== null &&
      typeof numberOwners === "number" &&
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,23}$/g.test(email) &&
      email.trim().length !== 0
     && /^[\w- ]{6,6}$/g.test(carNumber)){
      let currentDate = new Date();
      const date = `${currentDate.getDate() < 10 ? '0' +currentDate.getDate() : currentDate.getDate() }.${
        currentDate.getMonth() < 10
          ? "0" + (currentDate.getMonth()+ 1)
          : currentDate.getMonth() 
      }.${
        currentDate.getFullYear()  
      }`;
      if(!VINcar){
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
        type: typesOfActionsCar.ADD_CAR ,
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
      }else{
        await editData(TypeBases.CARS_IN_WAITING, {
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
          VIN: VINcar ?? VIN,
          problems: problems,
        }, idCar! );
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
            VIN: VINcar  ,
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
    setVIN(e.target.value);
    setVINError(false);
  };

  const ValidationNumberOwners = (
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
  };

  const ValidationEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    setEmail(e.target.value);
    if (pattern.test(e.target.value)) {
      setEmailError(false);
    }
  };

  const ValidationCarNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(/^[\w- ]{6,6}$/g);
    setCarNumber(e.target.value);
    if (pattern.test(e.target.value)) {
      setCarNumberError(false);
    }
  };

  return (
    <div>
      <div className={styles.createCardPopup}>
        <form className={styles.form} action="">
          <h1>Заявление на обслуживание</h1>

          <TextField
            className={styles.inputPhoneCustom}
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
            variant="standard"
            sx={{
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Имя*"
            color="primary"
          />

          <TextField
            className={styles.inputPhoneCustom}
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
            variant="standard"
            sx={{
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Фамилия*"
            color="primary"
          />
          <MuiTelInput
            inputProps={{ maxLength: 16 }}
            className={styles.inputPhoneCustom}
            value={phone}
            onChange={handlePhone}
            sx={{
              backgroundColor: "white",
            }}
            placeholder="Телефон"
            color="primary"
          />
          <TextField
             
            className={styles.inputPhoneCustom}
            disabled={VIN.length > 16}
            value={VINcar ?? VIN}
            error={VINError && VIN.trim().length !== 17 ? true : false}
            helperText={
              VINError && VIN.trim().length !== 17
                ? "Введите 17 символов VIN*"
                : false
            }
            onChange={ValidationVIN}
            variant="standard"
            sx={{
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="VIN 17 символов (обязательно)*"
            color="primary"
          />
          <TextField
            className={styles.inputPhoneCustom}
            variant="standard"
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            sx={{
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Регистрирована"
            color="primary"
          />
          <TextField
            className={styles.inputPhoneCustom}
            variant="standard"
            value={carNumber}
            disabled={carNumber.length > 5}
            onChange={(e) => setCarNumber(e.target.value)}
            error={carNumberError && carNumber.trim().length !== 6 ? true : false}
            helperText={carNumberError && carNumber.trim().length !== 6 ?
                  "Введите корректный номер авто"
                : false
            }
            sx={{
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Номер автомобиля"
            color="primary"
          />
          <TextField
            className={styles.inputPhoneCustom}
            value={carMileage}
            onChange={(e) => setCarMileage(e.target.value)}
            variant="standard"
            sx={{
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Пробег автомобиля"
            color="primary"
          />
          <TextField
            className={styles.inputPhoneCustom}
            value={color}
            onChange={(e) => setColor(e.target.value)}
            variant="standard"
            sx={{
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            color="primary"
            placeholder="Цвет"
          />
          <TextField
            className={styles.inputPhoneCustom}
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
            placeholder="Количество владельцев*"
            variant="standard"
            value={numberOwners}
            color="primary"
            inputProps={{ type: "number" }}
            sx={{
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
          />

          <TextField
            className={styles.inputPhoneCustom}
            value={accidents}
            onChange={(e) => setAccidents(e.target.value)}
            variant="standard"
            sx={{
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Аварии"
            color="primary"
          />

          <TextField
            className={styles.inputPhoneCustom}
            value={email}
            onChange={ValidationEmail}
            variant="standard"
            error={emailError ? true : false}
            helperText={
              emailError ? "Введите корректную электронную почту*" : false
            }
            inputProps={{
              type: "email",
            }}
            sx={{
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Электронная почта*"
            color="primary"
          />
          <TextField
            className={styles.inputPhoneCustom}
            value={problems}
            onChange={(e) => setProblems(e.target.value)}
            variant="standard"
            sx={{
               
              border: "2px solid #DBDBDB",
              borderRadius: "5px",
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder=" Ваша пролема"
             id="standard-multiline-static"
            rows={4}
            multiline
          />

          <div className={styles.form__footer}>
            <Button
              onClick={() => closeVisible(false)}
              sx={{
                color: "#705AF8",
              }}
            >
              Cancel
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
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCardPopup;
