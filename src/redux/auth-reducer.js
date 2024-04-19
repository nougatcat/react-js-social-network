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
                ...action.data, //полученные с сервера данные юзера
                isAuth: true //если пришли данные юзера, то залогинен
            };
        }
        default:
            return state;
    }
};

//action creator не экспортируется за ненадобностью
const setAuthUserData = (id, email, login) => ({ type: SET_USER_DATA, data: { id, email, login } });

//? thunk creator
export const getAuthUserData = () => {
    return (dispatch) => {
        authAPI.me()
            .then(data => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data; //первая data - представление данных в axios, вторая data - объект из API с таким названием
                    dispatch(setAuthUserData(id, email, login));
                }
            })
    }
}
export default authReduser;