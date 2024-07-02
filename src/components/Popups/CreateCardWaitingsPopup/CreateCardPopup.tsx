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
import { addData } from "../../../api/database/db";
import { Height } from "@mui/icons-material";

const CreateCardPopup: React.FC<{ closeVisible: any }> = ({ closeVisible }) => {
  const dispatch = useTypedDispatch();
               
  const [nameError, setNameError] = useState<boolean>(false);
  const [secondNameError, setSecondnameError] = useState<boolean>(false);
  const [ownerNumbersError, setNumbersOwnersError] = useState<boolean>(false);
  const [VINError, setVINError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);

  const [successProblem, setSuccessProblem] = useState<boolean>(false)

  const[customProblem, setCustomProblem] = useState<string>('')
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
     
  });
   

  const handleCustomProblem = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSuccessProblem(false)
    setCustomProblem(event.target.value);
   
  }

const submitProblems  = () =>{ 
  if(customProblem.length!==0){
    setProblems({
    ...problems, [customProblem] : true
  })
  }
  setSuccessProblem(true)
    setCustomProblem('')
 }

  function handlePhone(newValue: any) {
    return setPhone(newValue);
  }
  const {
     
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
      numberOwners === null || typeof numberOwners!== 'number'
    ) {
      setNumbersOwnersError(true);
    }
    if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,23}$/g.test(email)) || (email.trim().length === 0)) {
      console.log(emailError)
      setEmailError(true) 
    }
    if (
      VIN.length === 17 &&
      firstNameOwner.trim().length !== 0 &&
      secondNameOwner.trim().length !== 0 &&
      (numberOwners! > 0 && 
        numberOwners !== undefined && 
        numberOwners !== null && typeof numberOwners === "number") &&
        email.trim().length !== 0
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
          problems: problems!,
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

 
  const ValidationNumberOwners = (event: React.ChangeEvent<HTMLInputElement> ) => {
    event.preventDefault();
    if (event.target.value !== null && ( Number(event.target.value) ===   parseInt(event.target.value))) {
      setNumberOwners(Number(event.target.value));
      setNumbersOwnersError(false);
    }
    
  };

  
  const ValidationEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pattern = new RegExp(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    setEmail(e.target.value);
    if (pattern.test(e.target.value)) {

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
                ? "Введите имя*"
                : false
            }
            onChange={ValidationFirstNameOwner}
            variant="standard"
            sx={{
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
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
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Фамилия*"
            color="primary"
          />
          <MuiTelInput
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
            value={VIN}
            error={VINError && VIN.trim().length !== 17 ? true : false}
            helperText={
              VINError && VIN.trim().length !== 17
                ? "Введите 17 символов VIN*"
                : false
            }
            onChange={ValidationVIN}
            variant="standard"
            sx={{
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
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
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Регистрирована"
            color="primary"
          />
          <TextField
            className={styles.inputPhoneCustom}
            value={carMileage}
            onChange={(e) => setCarMileage(e.target.value)}
            variant="standard"
            sx={{
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
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
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
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
            placeholder="Количество владельцев"
            variant="standard"
            value={numberOwners}
            color="primary"
            inputProps={{ type: "number" }}
            sx={{
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
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
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
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
             
               error={emailError  ? true : false}
           
             helperText={
                emailError  
                 ? "Введите корректную электронную почту*"
                 : false                                           
             }
            inputProps={{
              type: "email",
            }}
            sx={{
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Электронная почта*"
            color="primary"
          />
           <TextField
            className={styles.inputPhoneCustom}
            value={customProblem}
            onChange={handleCustomProblem}
             
             variant="standard"
              
           
             
            sx={{
              border:  '2px solid #DBDBDB',
              borderRadius: '5px',
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder=" Ваша пролема"
            multiline
            helperText= { successProblem ? 'Ваша проблема добавлена' : false  }
          />
          <Button
              onClick={submitProblems}
              sx={{
                backgroundColor: "#705AF8",
                "&:hover": {
                  background: "#7975F8",
                },
              }}
              variant="contained"
            >
              Добавить проблему
            </Button>
           
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
