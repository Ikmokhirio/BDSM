import {message} from "antd";

export enum UserActionTypes {
    FETCH_USER = "FETCH_USER",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_ERROR = "FETCH_USER_ERROR"
}

export type userData = {
    username: null | string,
    email: null | string,
    avatar: null | string
}

interface UserState {
    userData: userData;
    loading: boolean;
    error: null | string;
}


interface FetchUserAction {
    type: UserActionTypes.FETCH_USER;
    payload: null;
}

interface FetchUserSuccessAction {
    type: UserActionTypes.FETCH_USER_SUCCESS;
    payload: any; // TODO : change to user type
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR;
    payload: string;
}

export type token = { // Token information from backend
    expiresIn: number,
    accessToken: string
}

// LOGIN
export type loginUserInformation = { // TODO : MOVE TYPE TO SEPARATE DIR
    username: string
    password: string
}

// REGISTER
export type registerUserInformation = { // TODO : MOVE TYPE TO SEPARATE DIR
    username: string
    email: string
    password: string
}

type UserAction =
    FetchUserAction
    | FetchUserSuccessAction
    | FetchUserErrorAction;

const initialState: UserState = {
    userData: {
        username: null,
        avatar: null,
        email: null
    },
    loading: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER:
            return {
                loading: true, error: null, userData: {
                    username: null,
                    avatar: null,
                    email: null
                }
            }
        case UserActionTypes.FETCH_USER_SUCCESS:
            message.success("Авторизация успешна!");
            return {loading: false, error: null, userData: action.payload};
        case UserActionTypes.FETCH_USER_ERROR:
            message.error(`Произошла ошбика при авторизации ${action.payload}`);
            return {
                loading: false, error: action.payload, userData: {
                    username: null,
                    avatar: null,
                    email: null
                }
            };
        default:
            return state;
    }
}