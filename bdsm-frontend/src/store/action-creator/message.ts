import {Dispatch} from "redux";
import {MessageActionTypes} from "../reducers/MessageReducer";

export const sendMessage = (data: any) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({
                type: MessageActionTypes.FETCH_MESSAGE
            });
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();

            if (json.statusCode != "200") { // TODO : change to constant
                dispatch({
                    type: MessageActionTypes.FETCH_MESSAGE_ERROR,
                    payload: json.message
                });
            } else {
                dispatch({
                    type: MessageActionTypes.FETCH_MESSAGE_SUCCESS
                })
            }

        } catch (e) {
            dispatch({type: MessageActionTypes.FETCH_MESSAGE_ERROR, payload: e.message});
        }
    }
}