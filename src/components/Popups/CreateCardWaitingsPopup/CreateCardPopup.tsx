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
import { useTypedDispatch } from "../../../state/hooks/hooks";
import { Color, TypeBases } from "../../../state/types";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import { addData } from "../../../api/database/db";
import { Height } from "@mui/icons-material";

const CreateCardPopup: React.FC<{ closeVisible: any }> = ({ closeVisible }) => {
  const dispatch = useTypedDispatch();
  const [nameError, setNameError] = useState<boolean>(false);
  const [secondNameError, setSecondnameError] = useState<boolean>(false);
  const [ownerNumbersError, setNumbersOwnersError] = useState<boolean>(false);
  const [VINError, setVINError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

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
  const [problems, setProblems] = React.useState({
    engine: true,
    fuses: false,
    catalyst: false,
    generator: true,
    brakeSystem: false,
    windshieldWashers: false,
    alarm: true,
    steeringSystem: false,
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProblems({
      ...problems,
      [event.target.name]: event.target.checked,
    });
  };
  function handlePhone(newValue: any) {
    return setPhone(newValue);
  }
  const {
    engine,
    fuses,
    catalyst,
    generator,
    brakeSystem,
    windshieldWashers,
    alarm,
    steeringSystem,
  } = problems;
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
      numberOwners === null
    ) {
      setNumbersOwnersError(true);
    }

    if (
      VIN.length === 17 &&
      firstNameOwner.trim().length !== 0 &&
      secondNameOwner.trim().length !== 0 &&
      (numberOwners! > 0 ||
        numberOwners !== undefined ||
        numberOwners !== null) &&
      emailError === false
    ) {
      await addData(TypeBases.CARS_IN_WAITING, {
        accidents: accidents,
        carMileage: carMileage,
        color: color,
        email: email,
        firstNameOwner: firstNameOwner,
        id: IdKey,
        numberOwners: numberOwners,
        registration: registration,
        secondNameOwner: secondNameOwner,
        tel: phone,
        VIN: VIN,
        problems: problems,
      });
      await dispatch({
        type: "ADD_CAR",
        payload: {
          accidents: accidents,
          carMileage: carMileage,
          color: color,
          email: email,
          firstNameOwner: firstNameOwner,
          id: IdKey,
          numberOwners: numberOwners!,
          registration: registration,
          secondNameOwner: secondNameOwner,
          tel: phone,
          VIN: VIN,
          problems: problems,
        },
      });
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
    setNumberOwners(+event.target.value);
    setNumbersOwnersError(false);
  };
  const ValidationEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    setEmail(e.target.value);
    if (pattern.test(email)) {
      setEmailError(false);
    }
  };

  return (
    <div>
      <div className={styles.createCardPopup}>
        <form className={styles.form} action="">
          <h1>Форма для заполнения заявки</h1>

          <TextField
            className={styles.inputPhoneCustom}
            value={firstNameOwner}
            error={
              nameError && firstNameOwner.trim().length === 0 ? true : false
            }
            helperText={
              nameError && firstNameOwner.trim().length === 0
                ? "Введите имя"
                : false
            }
            onChange={ValidationFirstNameOwner}
            variant="standard"
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Имя"
            color="warning"
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
                ? "Введите фамилию"
                : false
            }
            onChange={ValidationSecondNameOwner}
            variant="standard"
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Фамилия"
            color="warning"
          />
          <MuiTelInput
            className={styles.inputPhoneCustom}
            value={phone}
            onChange={handlePhone}
            sx={{
              backgroundColor: "white",
            }}
            placeholder="Телефон"
            color="warning"
          />
          <TextField
            className={styles.inputPhoneCustom}
            value={VIN}
            error={VINError && VIN.trim().length !== 17 ? true : false}
            helperText={
              VINError && VIN.trim().length !== 17
                ? "Введите 17 символов VIN"
                : false
            }
            onChange={ValidationVIN}
            variant="standard"
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="VIN 17 символов (обязательно)"
            color="warning"
          />
          <Input
            className={styles.inputCustom}
            value={registration}
            onChange={(e) => setRegistration(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Регистрирована"
            color="warning"
          />
          <Input
            className={styles.inputCustom}
            value={carMileage}
            onChange={(e) => setCarMileage(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Пробег автомобиля"
            color="warning"
          />
          <Input
            className={styles.inputCustom}
            value={color}
            onChange={(e) => setColor(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            color="warning"
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
                ? "Введите корректное число владельцев"
                : false
            }
            onChange={ValidationNumberOwners}
            placeholder="Количество владельцев"
            variant="standard"
            value={numberOwners}
            color="warning"
            inputProps={{ type: "number" }}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
          />

          <Input
            className={styles.inputCustom}
            value={accidents}
            onChange={(e) => setAccidents(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Аварии"
            color="warning"
          />
          <TextField
            className={styles.inputPhoneCustom}
            value={email}
            onChange={ValidationEmail}
             variant="standard"
            error={emailError && email.trim().length !== 0 ? true : false}
           
            helperText={
              emailError && email.trim().length !== 0
                ? "Введите корректную электронную почту"
                : false                                           //TODO
            }
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Электронная почта"
            color="warning"
          />

          <FormControl>
            <FormLabel
              color="warning"
              aria-labelledby="demo-radio-buttons-group-label"
            >
              Проблемы вашего авто
            </FormLabel>
            <FormGroup
              className={styles.createCardPopup__radioGroup}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
            >
              <FormControlLabel
                className={styles.checkBoxLabelCustom}
                value="engine"
                control={
                  <Checkbox
                    checked={engine}
                    onChange={handleChange}
                    name="engine"
                    color="warning"
                  />
                }
                label="Двигатель"
              />
              <FormControlLabel
                className={styles.checkBoxLabelCustom}
                value="fuses"
                control={
                  <Checkbox
                    checked={fuses}
                    onChange={handleChange}
                    name="fuses"
                    color="warning"
                  />
                }
                label="Предохранители"
              />
              <FormControlLabel
                className={styles.checkBoxLabelCustom}
                value="catalyst"
                control={
                  <Checkbox
                    checked={catalyst}
                    onChange={handleChange}
                    name="catalyst"
                    color="warning"
                  />
                }
                label="Катализатор"
              />
              <FormControlLabel
                className={styles.checkBoxLabelCustom}
                value="generator"
                control={
                  <Checkbox
                    checked={generator}
                    onChange={handleChange}
                    name="generator"
                    color="warning"
                  />
                }
                label="Генератор"
              />
              <FormControlLabel
                className={styles.checkBoxLabelCustom}
                value="brakeSystem"
                control={
                  <Checkbox
                    checked={brakeSystem}
                    onChange={handleChange}
                    name="brakeSystem"
                    color="warning"
                  />
                }
                label="Тормозная система"
              />
              <FormControlLabel
                className={styles.checkBoxLabelCustom}
                value="windshieldWashers"
                control={
                  <Checkbox
                    checked={windshieldWashers}
                    onChange={handleChange}
                    name="windshieldWashers"
                    color="warning"
                  />
                }
                label="Омыватели лобового стекла"
              />

              <FormControlLabel
                className={styles.checkBoxLabelCustom}
                value="alarm"
                control={
                  <Checkbox
                    checked={alarm}
                    onChange={handleChange}
                    name="alarm"
                    color="warning"
                  />
                }
                label="Аварийная сигнализация"
              />
              <FormControlLabel
                className={styles.checkBoxLabelCustom}
                value="steeringSystem"
                control={
                  <Checkbox
                    checked={steeringSystem}
                    onChange={handleChange}
                    name="steeringSystem"
                    color="warning"
                  />
                }
                label="Рулевая система"
              />
            </FormGroup>
          </FormControl>
          <div className={styles.form__footer}>
            <Button
              onClick={() => closeVisible(false)}
              sx={{
                backgroundColor: "#e68d1a",
                "&:hover": {
                  background: "#aa670e",
                },
              }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              onClick={submitForm}
              sx={{
                backgroundColor: "#e68d1a",
                "&:hover": {
                  background: "#aa670e",
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
