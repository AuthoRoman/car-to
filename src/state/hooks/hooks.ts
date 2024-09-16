import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../slices";
import { useSelector, useDispatch } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch = () => useDispatch<AppDispatch>();
