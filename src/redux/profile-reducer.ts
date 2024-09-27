import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileAPI.ts";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { ResultCodesEnum } from "../api/api.ts";


let initialState = {
    profile: null as ProfileType | null,
    status: ''
} //значение по умолчанию

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case "profilePage/SET_USER_PROFILE": {
            return {
                ...state,
                profile: action.profile
            }
        }
        case "profilePage/SET_STATUS": {
            return {
                ...state,
                status: action.status
            }
        }
        case "profilePage/SAVE_PHOTO_SUCCESS": {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType //! без as ProfileType ошибка
            }
        }
        default:
            return state;
    }
}

export const actions = {
    setUserProfile : (profile: ProfileType)  => ({type: 'profilePage/SET_USER_PROFILE',profile} as const),
    setStatus : (status: string) => ({type: 'profilePage/SET_STATUS',status} as const),
    savePhotoSuccess : (photos: PhotosType) => ({type: 'profilePage/SAVE_PHOTO_SUCCESS',photos} as const)
}




//? thunk creator
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getUserProfile(userId)
    dispatch(actions.setUserProfile(data));
}
export const getStatus = (userId: number): ThunkAction<void, AppStateType, unknown, ActionsTypes> => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status));
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id
    const data = await profileAPI.saveProfile(profile)
    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId != null) dispatch(getUserProfile(userId))
        else throw new Error('userId cannot be null')
    } else {
        //dispatch(stopSubmit('edit-profile', {"contacts": {'facebook': response.data.messages[0]}})) //если распарсить ответы сервера, то можно будет таким образом сопоставлять ошибку и конкретный импут
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export type InitialStateType = typeof initialState 
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType< typeof stopSubmit >>

export default profileReducer;