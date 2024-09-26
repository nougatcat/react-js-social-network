import { combineReducers, legacy_createStore as createStore, applyMiddleware, Action, AnyAction } from "redux";
import profileReducer from "./profile-reducer.ts";
import dialogsReducer from "./dialogs-reducer.ts";
import usersReduser from "./users-reducer.ts";
import authReduser from "./auth-reducer.ts";
import { ThunkAction, ThunkDispatch, thunk as thunkMiddleware } from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReduser from "./app-reducer.ts";
import { composeWithDevTools } from 'redux-devtools-extension';
import chatReduser from "./chat-reducer.ts";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser,
    chat: chatReduser
})

type RootReducerType = typeof rootReducer // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

// let state: AppStateType


//type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never //укороченная запись вместо закоментированных двух строчек, что выше

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A> //по умолчанию может использовать любые экшены

let store = createStore(rootReducer, 
    composeWithDevTools( applyMiddleware(thunkMiddleware))
    ); 
    //!Если расширение выключено, то использование composeWithDevTools может вызвать ошибку, еще на него почему-то ругается ts

// @ts-ignore
window.store = store; //для отладки делаем глобальную копию store



export type AppDispatch = ThunkDispatch<AppStateType, unknown, Action>
export default store;