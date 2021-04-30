import {combineReducers} from "redux"
import {userReducer} from "./UserReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    todo: userReducer
})

export type RootState = ReturnType<typeof rootReducer>