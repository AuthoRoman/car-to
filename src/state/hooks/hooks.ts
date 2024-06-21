import { TypedUseSelectorHook } from "react-redux";
import { RootState } from "../reducers";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppStore } from "../reducers";


export const useTypedSelector:TypedUseSelectorHook<RootState> = useSelector
export const useTypedDispatch = () => useDispatch<AppStore>()