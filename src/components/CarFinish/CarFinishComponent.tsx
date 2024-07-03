import React, { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import styles from "./CarFinishComponent.module.css";
import {
  cardFinish,
  finishCarTypesAction,
  ICar,
  localInRussian,
  LocalInRussianKeys,
  TypeBases,
} from "../../state/types";
import { deleteData, getStoreData } from "../../api/database/db";

import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import FinishPopup from "../Popups/FinishPopup/FinishPopup";
import InfoFinishCar from "../Popups/InfoAboutCarsPopup/InfoFinishCar/InfoFinishCar";

export default function CarFinishComponent() {
  const dispatch = useTypedDispatch();
  const [isPopupInfoFinishCarOpen, setisPopupInfoFinishCarOpen] = useState<boolean>(false)
  const [currentCar, setCurrentCar] = useState<cardFinish>()

  const deleteHandler = async (car: cardFinish) => {
    await deleteData(TypeBases.CARS_IN_FINISH, car.id);
    dispatch({ type: finishCarTypesAction.DELETE_FINISH_CAR, payload: car });
  };

  const cars = useTypedSelector((state) => state.carsInFinish.cars);
  const getInfo = (car:cardFinish) =>{
    setisPopupInfoFinishCarOpen(true)
    setCurrentCar(car)
  }

  const closePopup = () =>{
    setisPopupInfoFinishCarOpen(false)
  }

  useEffect(() => {
    if (cars.length == 0) {
      (async () => {
        const carsDB = await getStoreData<ICar>(TypeBases.CARS_IN_FINISH);
        carsDB.map((car) =>
          dispatch({ type: finishCarTypesAction.ADD_FINISH_CAR, payload: car })
        );
      })();
    }
  }, []);
  return (
    <div>
      <div>
        {isPopupInfoFinishCarOpen &&(
          <div><InfoFinishCar car={currentCar!} closeInfoCar={closePopup}/></div>
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
          Готовых машин нет
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
                <TableCell align="center">Имя Мастера обслуживавшего авто</TableCell>
                <TableCell align="center">Автомобиль</TableCell>
                <TableCell align="center">Год выпуска авто </TableCell>
                <TableCell align="center">Работа сделанная на автомобилем</TableCell>
                <TableCell align="center">Действие</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <TableRow
                  key={car.id}
                  onClick = {()=> getInfo(car)}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } ,
                "&:hover": {cursor: 'pointer'}}}
                >
                  <TableCell align="center" component="th" scope="row">
                    {car.nameMaster}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {car.manufacturer}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {car.modelYear}
                  </TableCell>
                  <TableCell align="center">{car.workOncar} </TableCell>
                  

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
                        onClick={() => deleteHandler(car)}
                        sx={{
                          backgroundColor: "#705AF8",
                          "&:hover": {
                            background: "#7975F8",
                          },
                        }}
                        variant="contained"
                      >
                        Удалить
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
    </div>
  );
}
