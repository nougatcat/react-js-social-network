import { stopSubmit } from "redux-form";
import { authAPI, securityAPI } from "../api/api";

const SET_USER_DATA = 'auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';


let initialState  = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false, //(не) залогинен
    captchaUrl: null as null | string//если null то капча необязательна
};
export type InitialStateType = typeof initialState

const authReduser = (state = initialState, action: any): InitialStateType  => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS: {
            return {
                ...state,
                ...action.payload, //полученные с сервера данные юзера
            };
        }
        default:
            return state;
    }
};

type SetAuthUserDataActionPayloadType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}
type SetAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: SetAuthUserDataActionPayloadType
}

//action creator не экспортируется за ненадобностью
const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
    type: SET_USER_DATA, payload: { id, email, login, isAuth } 
});

type GetCapthcaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: {captchaUrl: string}
}
const getCaptchaUrlSuccess = (captchaUrl: string): GetCapthcaUrlSuccessActionType => ({type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}})

//? thunk creator
export const getAuthUserData = () => async (dispatch: any) => { //ретурн заменили на стрелку
    const data = await authAPI.me() //вместо обычного промиса пишем await функцию (более короткий код)
    if (data.resultCode === 0) {
        let { id, email, login } = data.data; //первая data - представление данных в axios, вторая data - объект из API с таким названием
        dispatch(setAuthUserData(id, email, login, true));
    }
}
export const login = (email: string, password: string, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    }
    else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Неопознанная ошибка'
        dispatch(stopSubmit("login", { _error: message }))
        //response.data.messages - это ошибки, которые посылает сервер
    }
}
export const logout = () => async (dispatch: any) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = () => async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(getCaptchaUrlSuccess(captchaUrl))
}
export default authReduser;