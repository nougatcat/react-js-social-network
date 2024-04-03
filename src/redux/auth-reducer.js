const SET_USER_DATA= 'SET_USER_DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false //(не) залогинен
};

const authReduser = (state = initialState, action) => {
    switch(action.type) {
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

export const setAuthUserData = (id, email, login) => ({type: SET_USER_DATA, data: {id,email,login}});

export default authReduser;