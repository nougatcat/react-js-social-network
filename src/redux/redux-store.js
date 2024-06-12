import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import sidebarReducer from "./sidebar-reducer.ts";
import usersReduser from "./users-reducer.ts";
import authReduser from "./auth-reducer.ts";
import { thunk as thunkMiddleware } from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReduser from "./app-reducer.ts";
import { composeWithDevTools } from 'redux-devtools-extension';

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser
})

let store = createStore(reducers, 
    composeWithDevTools( applyMiddleware(thunkMiddleware))); 
    //!Если расширение выключено, то использование composeWithDevTools вызывает ошибку

window.store = store; //для отладки делаем глобальную копию store

export default store;