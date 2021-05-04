import {message} from "antd"

export enum MessageActionTypes {
    FETCH_MESSAGE = "FETCH_MESSAGE",
    FETCH_MESSAGE_SUCCESS = "FETCH_MESSAGE_SUCCESS",
    FETCH_MESSAGE_ERROR = "FETCH_MESSAGE_ERROR",
    FETCH_GROUPS = "FETCH_GROUPS"
}

interface MessageState {
    loading: boolean;
    error: null | string;
    groups: null | groupInfo[]; // TODO : Change
}

export interface groupInfo {
    id: number,
    name: string
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

interface FetchGroupsAction {
    type: MessageActionTypes.FETCH_GROUPS;
    payload: groupInfo[];
}


const initialState: MessageState = {
    loading: false,
    error: null,
    groups: []
}

type messageAction =
    FetchMessageAction
    | FetchMessageSuccessAction
    | FetchMessageErrorAction
    | FetchGroupsAction;


export const messageReducer = (state = initialState, action: messageAction): MessageState => {
    switch (action.type) {
        case(MessageActionTypes.FETCH_MESSAGE): {
            return {
                loading: true, error: null, groups: null
            }
        }
        case(MessageActionTypes.FETCH_MESSAGE_SUCCESS): {
            message.success("Задание создано");
            return {
                loading: false, error: null, groups: state.groups
            }
        }
        case(MessageActionTypes.FETCH_MESSAGE_ERROR): {
            message.error(`Произошла ошбика ${action.payload}`);
            return {
                loading: false, error: action.payload, groups: null
            }
        }
        case(MessageActionTypes.FETCH_GROUPS): {
            message.success("Групы загружены");
            return {
                loading: false, error: null, groups: action.payload
            }
        }
        default:
            return state;
    }
}