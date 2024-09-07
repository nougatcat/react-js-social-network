import { ThunkAction } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer.ts";
import { AppStateType, InferActionsTypes } from "./redux-store.ts";


let initialState = {
    initialized: false
};

export const actions = {
    initializedSuccess: () => ({ type: 'app/INITIALIZED_SUCCESS' } as const)
}
export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>


const appReduser = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'app/INITIALIZED_SUCCESS': {
            return {
                ...state,
                initialized: true
            };
        }

        default:
            return state;
    }
};




type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes> //не так как по видео, сделал сам
//? thunk creator
export const initializeApp = (): ThunkType => {
    return (dispatch) => {
        let promise = dispatch(getAuthUserData());

        Promise.all([promise])
            .then(() => {
                dispatch(actions.initializedSuccess());
            })
    }
}

export default appReduser;