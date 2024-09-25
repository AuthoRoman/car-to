import { useTypedDispatch, useTypedSelector } from "../../../state/hooks/hooks";
import { setNewCar } from "../../../state/slices/CurrentCarSlice";

const resetCurrentCar = () => {
  const car = useTypedSelector((state) => state.currentCar);
  const dispatch = useTypedDispatch();

  if (car) {
    dispatch(
      setNewCar({
        id: 0,
        VIN: "",
        tel: "",
        email: "",
        firstNameOwner: "",
        secondNameOwner: "",
        numberOwners: 0,
        color: "",
        carMileage: "",
        carNumber: "",
        registration: "",
        accidents: "",
        problems: "",
      }),
    );
  }
};

export default resetCurrentCar;
