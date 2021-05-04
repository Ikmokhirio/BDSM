import {act} from "react-dom/test-utils";
import {message} from "antd"

export enum MessageActionTypes {
    FETCH_MESSAGE = "FETCH_MESSAGE",
    FETCH_MESSAGE_SUCCESS = "FETCH_MESSAGE_SUCCESS",
    FETCH_MESSAGE_ERROR = "FETCH_MESSAGE_ERROR"
}

interface MessageState {
    loading: boolean;
    error: null | string;
}

interface FetchMessageAction {
    type: MessageActionTypes.FETCH_MESSAGE;
    payload: null;
}

interface FetchMessageSuccessAction {
    type: MessageActionTypes.FETCH_MESSAGE_SUCCESS;
    payload: null;
}

interface FetchMessageErrorAction {
    type: MessageActionTypes.FETCH_MESSAGE_ERROR;
    payload: string;
}

const initialState = {
    loading: false,
    error: null
}

type UserAction =
    FetchMessageAction
    | FetchMessageSuccessAction
    | FetchMessageErrorAction;


export const messageReducer = (state = initialState, action: UserAction): MessageState => {
    switch (action.type) {
        case(MessageActionTypes.FETCH_MESSAGE): {
            message.success("Задание создаётся");
            return {
                loading: true, error: null
            }
        }
        case(MessageActionTypes.FETCH_MESSAGE_SUCCESS): {
            message.success("Задание создано");
            return {
                loading: false, error: null
            }
        }
        case(MessageActionTypes.FETCH_MESSAGE_ERROR): {
            message.error(`Произошла ошбика ${action.payload}`);
            return {
                loading: false, error: action.payload
            }
        }
        default:
            return state;
    }
}