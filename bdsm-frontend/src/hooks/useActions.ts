import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import * as UserActionCreators from "../store/action-creator/user"
import * as MessageActionCreators from "../store/action-creator/message"

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(UserActionCreators, dispatch);
}

export const useMessage = () => {
    const dispatch = useDispatch();
    return bindActionCreators(MessageActionCreators, dispatch);
}