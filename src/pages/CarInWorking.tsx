import React, { useEffect, useState } from "react";
import { useTypedSelector } from "../state/hooks/hooks";
import CarsInService from "../components/CarsService/CarsInService";
import FinishPopup from "../components/Popups/FinishPopup/FinishPopup";
import {
  cardService,
  ICar,
  serviceCarTypesAction,
  TypeBases,
} from "../state/types";
import { useDispatch } from "react-redux";
import { getStoreData } from "../api/database/db";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import InfoServiceCar from "../components/Popups/InfoAboutCarsPopup/InfoServiceCar/InfoServiceCar";

const CarinWorking: React.FC = () => {
  const cars = useTypedSelector((state) => state.carsInServ.cars);
  const dispatch = useDispatch();
  const [currentCar, setCurrentCar] = useState<cardService>();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenServiceInfo, setIsOpenServiceInfo] = useState(false);

  useEffect(() => {
    (async () => {
      if (cars.length == 0) {
        const carsDB = await getStoreData<ICar>(TypeBases.CARS_IN_SERVICE);
        carsDB.map((x) =>
          dispatch({ type: serviceCarTypesAction.ADD_SERVICE_CAR, payload: x })
        );
      }
    })();
  }, []);

  const togglePopup = (booleanValue: boolean) => {
    setIsOpen(booleanValue);
  };

  const funSetCurrentCar = (event:React.FormEvent<EventTarget>,car: cardService) => {
    event.stopPropagation()
    setCurrentCar(car);
    togglePopup(true);
  };

  const getInfoServiceCard =(car:cardService) =>{
    setIsOpenServiceInfo(true)
    setCurrentCar(car)
  }
  const closeInfoCar = () =>{
    setIsOpenServiceInfo(false)
  }
  return (
    <div>
      {isOpen && (
        <div>
          <FinishPopup togglePopup={togglePopup} car={currentCar} />
        </div>
      )}
      {isOpenServiceInfo && (
        <div>
          <InfoServiceCar  closeInfoCar={closeInfoCar!} car={currentCar!} />
        </div>
      )}
      {cars.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: " center",
            alignItems: "center",
            width: "100%",
          }}
        >
          Заявок в обслуживании нет
        </div>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ width: "100%", margin: "0 auto" }}
        >
          <Table
            sx={{ minWidth: 100, width: "100%" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Имя Мастера взявшего авто</TableCell>
                <TableCell align="center">Автомобиль</TableCell>
                <TableCell align="center">Год изготовления </TableCell>
                <TableCell align="center">Добавлен в обслуживание</TableCell>
                <TableCell align="center">Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow
                  onClick = {()=>getInfoServiceCard(car)}
                  key={car.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } ,
                  "&:hover":{cursor: 'pointer'}}}
                >
                  <TableCell align="center" component="th" scope="row">
                    {car.nameMaster}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {car.manufacturer}
                  </TableCell>
                  <TableCell align="center">{car.modelYear} </TableCell>
                  <TableCell align="center">{car.date}</TableCell>

                  <TableCell align="center">
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        onClick={(event) => funSetCurrentCar(event,car)}
                        sx={{
                          backgroundColor: "#705AF8",
                          "&:hover": {
                            background: "#7975F8",
                          },
                        }}
                        variant="contained"
                      >
                        Завершить обслуживание
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default CarinWorking;
