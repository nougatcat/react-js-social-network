import { stopSubmit } from "redux-form";
import { profileAPI } from "../api/api.ts";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const ADD_POST = 'profilePage/ADD-POST'; //глобальная переменная типа для того, чтобы упростить (на самом деле это усложняет код)
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_STATUS = 'profilePage/SET_STATUS';
const DELETE_POST = 'profilePage/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profilePage/SAVE_PHOTO_SUCCESS'


let initialState = {
    posts: [
        { id: 1, message: 'Я что-то написал', likesCount: 2 },
        { id: 2, message: 'Привет мир', likesCount: 51 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    // newPostText: ''
} //значение по умолчанию
export type InitialStateType = typeof initialState 

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {
        case ADD_POST: {
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
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        // case DELETE_POST: {
        //     return {
        //         ...state,
        //         posts: [...state.posts.filter(post => post.id !== action.postId)]
        //     }
        // }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos} as ProfileType //! без as ProfileType ошибка потому что action any
            }
        }
        default:
            return state;
    }
}

type ActionTypes = AddPostActionCreatorActionType | SetUserProfileActionType | SetStatusActionType | SavePhotoSuccessActionType

type AddPostActionCreatorActionType = { type: typeof ADD_POST, newPostElement: string }
export const addPostActionCreator = (newPostElement: string): AddPostActionCreatorActionType => ({type: ADD_POST, newPostElement}); //то же самое, что с ретурном
type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType }
export const setUserProfile = (profile: ProfileType): SetUserProfileActionType  => ({type: SET_USER_PROFILE,profile})
type SetStatusActionType = { type: typeof SET_STATUS, status: string}
export const setStatus = (status: string): SetStatusActionType => ({type: SET_STATUS,status})
type SavePhotoSuccessActionType = { type: typeof SAVE_PHOTO_SUCCESS, photos: PhotosType}
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({type: SAVE_PHOTO_SUCCESS,photos})

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

//? thunk creator
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const response = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(response.data));
} //специально рядом оставил async-await и обычный промис для наглядности (по сути одно и то же)
export const getStatus = (userId: number): ThunkAction<void, AppStateType, unknown, ActionTypes> => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data));
        })
    }
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
//?То же самое, но с обработкой ошибок сервера 
// export const updateStatus = (status) => async (dispatch) => {
//     try {
//         const response = await profileAPI.updateStatus(status)
//         if (response.data.resultCode === 0) {
//             dispatch(setStatus(status));
//         }   
//     } catch(error) {что-то делаем если поймали ошибку}
// }
export const savePhoto = (file: any): ThunkType => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}
//!stopSubmit принадлежит redux-form. Пока не могу типизировать
export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        //dispatch(stopSubmit('edit-profile', {"contacts": {'facebook': response.data.messages[0]}})) //если распарсить ответы сервера, то можно будет таким образом сопоставлять ошибку и конкретный импут
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}


export default profileReducer;