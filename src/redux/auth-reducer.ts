import { stopSubmit } from "redux-form";
import { ResultCodesEnum, ResultCodesForCaptchaEnum } from "../api/api.ts";
import { authAPI } from '../api/authAPI.ts'
import { securityAPI } from "../api/securityAPI.ts";
// import { ThunkAction } from "redux-thunk";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";


let initialState  = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false, //(не) залогинен
    captchaUrl: null as null | string//если null то капча необязательна
};


const authReduser = (state = initialState, action: ActionsTypes): InitialStateType  => {
    switch (action.type) {
        case "auth/SET_USER_DATA":
        case "auth/GET_CAPTCHA_URL_SUCCESS": {
            return {
                ...state,
                ...action.payload, //полученные с сервера данные юзера
            };
        }
        default:
            return state;
    }
};

const actions = {
    setAuthUserData : (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({ 
        type: 'auth/SET_USER_DATA', payload: { id, email, login, isAuth } } as const),
    getCaptchaUrlSuccess : (captchaUrl: string) => ({type: 'auth/GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}} as const)
}




//? thunk creator
export const getAuthUserData = (): ThunkType => async (dispatch) => { //ретурн заменили на стрелку
    const meData = await authAPI.me() //вместо обычного промиса пишем await функцию (более короткий код)
    if (meData.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = meData.data; //первая data - представление данных в axios, вторая data - объект из API с таким названием
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

//?что делать со stopSubmit? Смотри как задан ThunkType в этом файле
export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch: any) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)
    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    }
    else {
        if (loginData.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Неопознанная ошибка'
        dispatch(stopSubmit("login", { _error: message }))
        //loginData.messages - это ошибки, которые посылает сервер
    }
}
export const logout = (): ThunkType => async (dispatch) => {
    const response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}
export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.getCaptchaUrl()
    const captchaUrl = data.url
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}


export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType< typeof stopSubmit >>




export default authReduser;