//! этот файл больше не используется! Смотри redux-store
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import sidebarReducer from "./sidebar-reducer";


let store = { //объект с функциями и переменными (типа ооп, но без классов)
    _state : {
        profilePage : {
            posts : [
                { id: 1, message: 'А я люблю обмазываться не..', likesCount: 2 },
                { id: 2, message: 'Я долбюоеб', likesCount: 51 }
            ],
            newPostText: 'sample text'
        },
        dialogsPage : {
            messages : [
                { id: 1, message: 'привет' },
                { id: 2, message: 'привет1' },
                { id: 3, message: 'привет!' },
                { id: 4, message: 'приветик' },
                { id: 5, message: 'пукни в пакетик' },
                { id: 6, message: 'хаюхай' }
            ],
            dialogs : [
                { id: 1, name: 'Дима' },
                { id: 2, name: 'Женя' },
                { id: 3, name: 'Иван' },
                { id: 4, name: 'Вика' },
                { id: 5, name: 'Маша' },
                { id: 6, name: 'Саша' }
            ],
            newMessageBody : ""
        },
        sidebar : {
            //тут нихуя нет, но может быть в будущем
        }
    },
    _callSubscriber() { //rerenderentiretree
        //заглушка
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer; //паттерн наблюдатель
    },

    dispatch(action) { // {type: 'ADD-POST'}  


        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);

    }
}



//export default store;
//window.store = store; //покажет копию state при вызове через консоль, эта копия живет до перезагрузки

//! этот файл больше не используется! Смотри redux-store