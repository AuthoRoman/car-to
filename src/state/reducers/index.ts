import { combineReducers } from "redux";
import { carReducer } from "./carReducer";
import { store } from "../store";




export const rootReducer = combineReducers({
    cars:carReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type  AppStore = typeof store.dispatch