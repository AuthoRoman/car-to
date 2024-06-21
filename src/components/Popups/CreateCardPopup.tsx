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
  
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { useTypedDispatch } from "../../state/hooks/hooks";
import { Color } from '../../state/types';
import { Unstable_NumberInput as NumberInput } from '@mui/base/Unstable_NumberInput';



const CreateCardPopup: React.FC<{ closeVisible: any }> = ({ closeVisible }) => {
  const dispatch = useTypedDispatch()


  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameOwner, setFirstNameOwner] = useState("");
  const [secondNameOwner, setSecondNameOwner] = useState("");
  const [numberOwners, setNumberOwners] = useState<number >(0);
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

  async function submitForm(){
   await dispatch({ type: 'ADD_CAR', payload:{accidents:accidents, carMileage:carMileage, color: color, email:email, firstNameOwner:firstNameOwner, id:Math.random()*100, numberOwners:numberOwners, registration:registration, secondNameOwner: secondNameOwner, tel: phone, VIN: VIN, problems: problems }})
   closeVisible(false)

  }
  const handleNumberChange = (
    event: React.FocusEvent<HTMLInputElement> | React.PointerEvent<Element> | React.KeyboardEvent<Element>, 
    value: number | null
  ) => {
    event.preventDefault()
    if (value !== null) {
      setNumberOwners(value);
    }
  };
  return (
    <div>
      <div className={styles.createCardPopup}>
        <form className={styles.form} action="">
          <h1>Форма для заполнения заявки</h1>

          <Input
          value={firstNameOwner}
          onChange={(e)=>setFirstNameOwner(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="Name"
          />

          <Input
          
          value={secondNameOwner}
          onChange={(e)=>setSecondNameOwner(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="SecondName"
          />
          <MuiTelInput
            value={phone}
            onChange={handlePhone}
            sx={{
              backgroundColor: "white",
            }}
            placeholder="Your phone"
          />
          <Input
          value={VIN}
          onChange={(e)=>setVIN(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="VIN number"
          />
          <Input
          value={registration}
          onChange={(e)=>setRegistration(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="registration"
          />
          <Input
          value={carMileage}
          onChange={(e)=>setCarMileage(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="carMileage"
          />
          <Input
          value={color}
          onChange={(e)=>setColor(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="color"
          />
          <NumberInput
          aria-label="Demo number input"
          value={numberOwners}
          onChange={handleNumberChange}
          component='input'
             
            placeholder="numberOwners"
          />
           
          <Input
          value={accidents}
          onChange={(e)=>setAccidents(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="accidents"
          />
          <Input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            sx={{
              padding: "0px 10px",
              backgroundColor: "white",
            }}
            placeholder="email"
          />
          <FormControl>
            <FormLabel aria-labelledby="demo-radio-buttons-group-label">
              Problems
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
                value="engine"
                control={<Checkbox checked={engine} onChange={handleChange}  name='engine'/>}
                label="engine"
              />
              <FormControlLabel
                value="fuses"
                control={<Checkbox checked={fuses} onChange={handleChange}  name='fuses'/>}
                label="fuses"
              />
              <FormControlLabel
                value="catalyst"
                control={
                  <Checkbox checked={catalyst} onChange={handleChange}  name='catalyst'/>
                }
                label="catalyst"
              />
              <FormControlLabel
                value="generator"
                control={<Checkbox checked={generator} name='generator' />}
                label="generator"
              />
              <FormControlLabel
                value="brakeSystem"
                control={
                  <Checkbox checked={brakeSystem} onChange={handleChange}  name='brakeSystem'/>
                }
                label="brakeSystem"
              />
              <FormControlLabel
                value="windshieldWashers"
                control={
                  <Checkbox
                    checked={windshieldWashers}
                    onChange={handleChange} name='windshieldWashers'
                  />
                }
                label="windshieldWashers"
              />

              <FormControlLabel
                value="alarm"
                control={<Checkbox checked={alarm} onChange={handleChange}  name='alarm'/>}
                label="alarm"
              />
              <FormControlLabel
                value="steeringSystem"
                control={
                  <Checkbox checked={steeringSystem} onChange={handleChange} name='steeringSystem' />
                }
                label="steeringSystem"
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
