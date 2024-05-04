import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false //(не) залогинен
};

const authReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...state,
                ...action.payload, //полученные с сервера данные юзера
            };
        }

        default:
            return state;
    }
};

//action creator не экспортируется за ненадобностью
const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { id, email, login, isAuth } });

//? thunk creator
export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.me()
            .then(data => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data; //первая data - представление данных в axios, вторая data - объект из API с таким названием
                    dispatch(setAuthUserData(id, email, login, true));
                }
            })
    }
}
export const login = (email, password, rememberMe) => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData())
            }
            else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Неопознанная ошибка'
                dispatch(stopSubmit("login", {_error: message}))
                //response.data.messages - это ошибки, которые посылает сервер
            }
        })
}
export const logout = () => (dispatch) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
        })
}
export default authReduser;