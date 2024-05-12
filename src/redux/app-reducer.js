import { getAuthUserData } from "./auth-reducer";


const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
};

const appReduser = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: {
            return {
                ...state,
                initialized: true
            };
        }

        default:
            return state;
    }
};


export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

//? thunk creator
export const initializeApp = () => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData());

        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess());
            })
    }
}

export default appReduser;