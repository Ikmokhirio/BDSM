import {combineReducers} from "redux"
import {userReducer} from "./UserReducer";
import {messageReducer} from "./MessageReducer";

export const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer
})

export type RootState = ReturnType<typeof rootReducer>