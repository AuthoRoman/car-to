import { 
  IAction,
  ICarsState,
  typesOfActionsCar 
} from "../types";

const initialState: ICarsState = {
  cars: [],
  filteredItems: [],
};

export const carReducer = (
  state = initialState,
  action: IAction
): ICarsState => {
  switch (action.type) {
    case typesOfActionsCar.ADD_CAR:
      return { ...state, cars: [...state.cars, action.payload!] };

    case typesOfActionsCar.EDIT_CAR:
      return {
        ...state,
        cars: state.cars.map((car) =>
          car.id === action.payload!.id
            ? Object.assign({}, car, action.payload)
            : car
        ),
      };
    case typesOfActionsCar.FIND_CAR:
      return {
        ...state,
        filteredItems: [...state.cars].filter(
          (x) =>
            x.carNumber
              .toLocaleLowerCase()
              .includes(action.payload!.carNumber.toLocaleLowerCase()) ||
            x.firstNameOwner
              .toLocaleLowerCase()
              .includes(action.payload!.carNumber.toLocaleLowerCase()) ||
            x.secondNameOwner
              .toLocaleLowerCase()
              .includes(action.payload!.carNumber.toLocaleLowerCase())
        ),
      };

    case typesOfActionsCar.SORT_CAR_FIRSTNAMEOWNER_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.firstNameOwner.localeCompare(b.firstNameOwner)
        ),
      };
    case typesOfActionsCar.SORT_CAR_EMAIL_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.email.localeCompare(b.email)
        ),
      };
    case typesOfActionsCar.SORT_CAR_NUMBERAUTO_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.carNumber.localeCompare(b.carNumber)
        ),
      };
    case typesOfActionsCar.SORT_CAR_TIME_UP:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          a.date!.localeCompare(b.date!)
        ),
      };
    case typesOfActionsCar.SORT_CAR_FIRSTNAMEOWNER_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.firstNameOwner.localeCompare(a.firstNameOwner)
        ),
      };
    case typesOfActionsCar.SORT_CAR_EMAIL_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.email.localeCompare(a.email)
        ),
      };
    case typesOfActionsCar.SORT_CAR_NUMBERAUTO_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.carNumber.localeCompare(a.carNumber)
        ),
      };
    case typesOfActionsCar.SORT_CAR_TIME_DOWN:
      return {
        ...state,
        filteredItems: [...state.filteredItems!].sort((a, b) =>
          b.date!.localeCompare(a.date!)
        ),
      };

    case typesOfActionsCar.DELETE_CAR:
      return {
        ...state,
        cars: state.cars.filter((car) => car.VIN !== action.payload!.VIN),
      };
    default:
      return state;
  }
};
