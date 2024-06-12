const SEND_MESSAGE = 'dialogsPage/SEND_MESSAGE';

type DialogType = {
    id: number
    name: string
}
type MessageType = {
    id: number
    message: string
}


let initialState = {
    messages : [
        { id: 1, message: 'привет' },
        { id: 2, message: 'привет1' },
        { id: 3, message: 'привет!' },
        { id: 4, message: 'приветик' },
        { id: 5, message: 'пакетик' },
        { id: 6, message: 'хаюхай' }
    ] as Array<MessageType>,
    dialogs : [
        { id: 1, name: 'Дима' },
        { id: 2, name: 'Женя' },
        { id: 3, name: 'Иван' },
        { id: 4, name: 'Вика' },
        { id: 5, name: 'Маша' },
        { id: 6, name: 'Саша' }
    ] as Array<DialogType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SEND_MESSAGE: {
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}] //запушили вместе с копированием объекта
            };
            // stateCopy.messages.push({id: 6, message: body}); //больше не нужно отдельно пушить, как и создавать именованную переменную stateCopy
        }
        default:
            return state;
    }
}

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({type: SEND_MESSAGE, newMessageBody});

export default dialogsReducer;