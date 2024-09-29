import { combineReducers, Action } from "redux";
import profileReducer from "./profile-reducer.ts";
import usersReduser from "./users-reducer.ts";
import authReduser from "./auth-reducer.ts";
import { ThunkAction, ThunkDispatch} from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReduser from "./app-reducer.ts";
import chatReduser from "./chat-reducer.ts";
import {configureStore} from '@reduxjs/toolkit'

let rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReduser,
    auth: authReduser,
    form: formReducer,
    app: appReduser,
    chat: chatReduser
})

type RootReducerType = typeof rootReducer // (globalState: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

//type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>
export type InferActionsTypes<T> = T extends {[key: string]: (...args: any[]) => infer U} ? U : never //укороченная запись вместо закоментированных двух строчек, что выше

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A> //по умолчанию может использовать любые экшены

let store = configureStore({
    reducer: rootReducer
})



// @ts-ignore
window.store = store; //для отладки делаем глобальную копию store



export type AppDispatch = ThunkDispatch<AppStateType, unknown, Action>
export default store;