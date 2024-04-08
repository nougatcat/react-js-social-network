import { combineReducers, legacy_createStore as createStore, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReduser from "./users-reducer";
import authReduser from "./auth-reducer";
import { thunk as thunkMiddleware } from "redux-thunk";

let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReduser,
    auth: authReduser
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store; //для отладки делаем глобальную копию store

export default store;