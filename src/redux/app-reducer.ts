import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer.ts";
import { AppStateType } from "./redux-store.ts";


const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

export type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
};

const appReduser = (state = initialState, action: InitializedSuccessActionType): InitialStateType => {
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

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType  => ({ type: INITIALIZED_SUCCESS }); //: InitializedSuccessActionType значит, что функция обязательно должна вернуть INITIALIZED_SUCCESS


type ThunkType = ThunkAction<void, AppStateType, unknown, InitializedSuccessActionType>
//? thunk creator
export const initializeApp = (): ThunkType => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData());

        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess());
            })
    }
}

export default appReduser;