import { combineReducers } from "redux";
import { carReducer } from "./carReducer";
import { store } from "../store";
import { ServiceCarReducer } from "./serviceCarReducer";




export const rootReducer = combineReducers({
    cars:carReducer,
    carsinServ: ServiceCarReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type  AppStore = typeof store.dispatch