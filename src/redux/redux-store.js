import {combineReducers, legacy_createStore as createStore} from "redux"; 
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReduser from "./users-reducer";

let reducers = combineReducers({
    profilePage : profileReducer,
    dialogsPage : dialogsReducer,
    sidebar : sidebarReducer,
    usersPage : usersReduser
})

let store = createStore(reducers);

window.store = store; //для отладки делаем глобальную копию store

export default store;