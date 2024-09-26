import { stopSubmit } from "redux-form";
import { BaseThunkType, InferActionsTypes } from "./redux-store";
import { chatAPI, ChatMessageAPIType, StatusType } from "../api/chatAPI.ts";
import { Dispatch } from "redux";
import { v1 } from 'uuid'


let initialState  = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

const chatReduser = (state = initialState, action: ActionsTypes): InitialStateType  => {
    switch (action.type) {
        case 'chat/MESSAGES_RECEIVED': {
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))] //uuid нужен чтобы не перерисовывать каждый раз все 100 сообщений при добавлении одного нового
                    .filter((m, index, array) => index >= array.length - 100)
                //filter нужен чтобы отобразить только последние 100 сообщений (но т.к. сервер каждый день(?) чистит массив сообщений, то там даже 100 не набирается)
            };
        }
        case 'chat/STATUS_CHANGED': {
            return {
                ...state,
                status: action.payload.status
            }
        }
        default:
            return state;
    }
};

const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({
        type: 'chat/MESSAGES_RECEIVED', payload: {messages}
    }as const),
    statusChanged: (status: StatusType) => ({
        type: 'chat/STATUS_CHANGED', payload: {status}
    }as const)
}

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {  //если сообщения уже переданы, то не передаем их заново
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }
    return _newMessageHandler
}
let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {  
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }
    return _statusChangedHandler
}

//? thunk creator
export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received',newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed',statusChangedHandlerCreator(dispatch))
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType< typeof stopSubmit >>
type ChatMessageType = ChatMessageAPIType & {id: string}


export default chatReduser;