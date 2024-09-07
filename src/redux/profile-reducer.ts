import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/profileAPI.ts";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { ResultCodesEnum } from "../api/api.ts";


let initialState = {
    posts: [
        { id: 1, message: 'Я что-то написал', likesCount: 2 },
        { id: 2, message: 'Привет мир', likesCount: 51 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    // newPostText: '' // больше не используется
} //значение по умолчанию

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case "profilePage/ADD-POST": {
            let newPost = {
                id: 5,
                message: action.newPostElement,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost], //пушим пост, но он удаляется после перезагрузки страницы, т.к. нет бэкенда (в файл state изменения не записываются)
                // newPostText: ''
            };
        }
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
        case "profilePage/DELETE_POST": {
            return {
                ...state,
                posts: [...state.posts.filter(post => post.id !== action.postId)]
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
    addPostActionCreator : (newPostElement: string) => ({type: 'profilePage/ADD-POST', newPostElement} as const), //то же самое, что с ретурном
    setUserProfile : (profile: ProfileType)  => ({type: 'profilePage/SET_USER_PROFILE',profile} as const),
    setStatus : (status: string) => ({type: 'profilePage/SET_STATUS',status} as const),
    deletePost : (postId: Number) => ({type: 'profilePage/DELETE_POST',postId} as const),
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