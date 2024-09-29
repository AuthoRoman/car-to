import { useTypedDispatch, useTypedSelector } from "../../../state/hooks/hooks";
import { setNewCar } from "../../../state/slices/CurrentCarSlice";
import { EMPTY_CAR } from "../constants/EMPTY_CAR";

const resetCurrentCar = () => {
  const car = useTypedSelector((state) => state.currentCar);
  const dispatch = useTypedDispatch();

  if (car) {
    dispatch(setNewCar(EMPTY_CAR));
  }
};

export default resetCurrentCar;
