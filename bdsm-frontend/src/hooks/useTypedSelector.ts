import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "../store/reducers/RootReducer";


export const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector; // Fixed type issue with useSelector