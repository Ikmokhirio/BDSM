import {Dispatch} from "redux";
import {UserActionTypes, loginUserInformation, registerUserInformation} from "../reducers/UserReducer"


export const fetchUser = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: UserActionTypes.FETCH_USER
            });
            const response = await fetch("api/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            });

            const json = await response.json();

            console.log(json);

            if (json.statusCode != "200") { // TODO : change to constant
                dispatch({
                    type: UserActionTypes.FETCH_USER_ERROR,
                    payload: json.message
                });
            } else {
                dispatch({
                    type: UserActionTypes.FETCH_USER_SUCCESS,
                    payload: json
                })
            }
        } catch (e) {
            dispatch({type: UserActionTypes.FETCH_USER_ERROR, payload: e.message});
        }
    }
}

export const loginUser = (loginInfo: loginUserInformation) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: UserActionTypes.FETCH_USER
            });
            const response = await fetch("api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(loginInfo)
            });

            const json = await response.json();

            console.log(json);

            if (json.statusCode != "200") { // TODO : change to constant
                dispatch({
                    type: UserActionTypes.FETCH_USER_ERROR,
                    payload: json.message
                });
            } else {
                localStorage.setItem("jwt", json.accessToken); // TODO : better approach
                dispatch({
                    type: UserActionTypes.FETCH_USER_SUCCESS,
                    payload: json
                })
            }
        } catch (e) {
            dispatch({type: UserActionTypes.FETCH_USER_ERROR, payload: e.message});
        }
    }
}

export const registerUser = (registerInfo: registerUserInformation) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: UserActionTypes.FETCH_USER
            });
            const response = await fetch("api/auth/registration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(registerInfo)
            });

            const json = await response.json();

            console.log(json);

            if (json.statusCode != "200") { // TODO : change to constant
                dispatch({
                    type: UserActionTypes.FETCH_USER_ERROR,
                    payload: json.message
                });
            } else {
                localStorage.setItem("jwt", json.accessToken); // TODO : better approach
                dispatch({
                    type: UserActionTypes.FETCH_USER_SUCCESS,
                    payload: json
                })
            }
        } catch (e) {
            dispatch({type: UserActionTypes.FETCH_USER_ERROR, payload: e.message});
        }
    }
}