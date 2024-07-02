import React, { useEffect, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../../state/hooks/hooks";
import CarComponent from "./CarComponent/CarComponent";
import CreateCardPopup from "../Popups/CreateCardWaitingsPopup/CreateCardPopup";
import ServicePopup from "../Popups/ServicePopup/ServicePopup";
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
import {
  ICar,
  ICarsState,
  TypeBases,
  typesOfActionsCar,
} from "../../state/types";
import { addData, deleteData, getStoreData } from "../../api/database/db";

const CarsListWaiting = () => {
  const dispatch = useTypedDispatch();

  const cars = useTypedSelector((state) => state.cars.cars);
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [PopupFixCar, setPopupFixCar] = useState(false);
  const [currentCar, setCurrentCar] = useState<ICar>();
  const [VIN, setVIN] = useState("");
  useEffect(() => {
    (async () => {
      if (cars.length == 0) {
        const carsDB = await getStoreData<ICar>(TypeBases.CARS_IN_WAITING);
        carsDB.map((x) =>
          dispatch({ type: typesOfActionsCar.ADD_CAR, payload: x })
        );
      }
    })();
  }, []);

  const deleteCar = async (car: ICar) => {
    await dispatch({ type: typesOfActionsCar.DELETE_CAR, payload: car! });
    await deleteData(TypeBases.CARS_IN_WAITING, car.id);
  };

  const closeWithNextStadyCar = async () => {
    if (currentCar) {
      console.log("сейчай удаляется " + currentCar.id);
      await dispatch({
        type: typesOfActionsCar.DELETE_CAR,
        payload: currentCar!,
      });
      await deleteData(TypeBases.CARS_IN_WAITING, currentCar.id);

      setPopupFixCar(false);
    }
  };

  const close = () => {
    PopupFixCar ? setPopupFixCar(false) : setIsVisiblePopup(false);
  };

  async function handleServicePop(VIN: string, car: ICar) {
    await setCurrentCar(car);
    await setVIN(VIN);
    await setPopupFixCar(true);
  }
  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {isVisiblePopup && (
          <div>
            <CreateCardPopup closeVisible={close} />{" "}
          </div>
        )}
        {PopupFixCar && (
          <div>
            <ServicePopup
              closeWithNextStadyCar={closeWithNextStadyCar}
              closeVisible={close}
              VIN={VIN}
              problems={currentCar?.problems!}
            />
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
            Добавь первый автомобиль!
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
                  <TableCell align="center">Имя Фамилия</TableCell>
                  <TableCell align="center">E-mail </TableCell>
                  <TableCell align="center">Номер авто </TableCell>
                  <TableCell align="center">Заявка сформирована </TableCell>
                  <TableCell align="center">Действие </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cars.map((car) => (
                  <TableRow
                    key={car.numberOwners}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {car.firstNameOwner} {car.secondNameOwner}
                    </TableCell>
                    <TableCell align="center">{car.email} </TableCell>
                    <TableCell align="center">{car.carNumber}</TableCell>
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
                        <Button onClick={() => deleteCar(car)} color="warning">
                          Удалить
                        </Button>
                        <Button
                          onClick={() => handleServicePop(car.VIN, car)}
                          sx={{
                            backgroundColor: "#705AF8",
                            "&:hover": {
                              background: "#7975F8",
                            },
                          }}
                          variant="contained"
                        >
                          Отправить на обслуживание
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <div>
          <Button
            onClick={() => setIsVisiblePopup(true)}
            sx={{
              backgroundColor: "#705AF8",
              height: `55px`,
              transition: "all .8s",
              "&:hover": {
                background: "#7975F8",
              },
            }}
            variant="contained"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CarsListWaiting;
