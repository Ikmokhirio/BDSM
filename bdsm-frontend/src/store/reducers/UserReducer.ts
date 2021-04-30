export enum UserActionTypes {
    FETCH_USER = "FETCH_USER",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_ERROR = "FETCH_USER_ERROR"
}


interface UserState {
    user: any; // TODO : change to user type
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
    accessToken : string
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
    user: {
        name: "Неизвестный" // TODO : remove magic string | convert to user type
    },
    loading: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.FETCH_USER:
            return {loading: true, error: null, user: null}
        case UserActionTypes.FETCH_USER_SUCCESS:
            return {loading: false, error: null, user: action.payload};
        case UserActionTypes.FETCH_USER_ERROR:
            return {loading: false, error: action.payload, user: null};
        default:
            return state;
    }
}