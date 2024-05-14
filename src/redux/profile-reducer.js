import { profileAPI } from "../api/api";

const ADD_POST = 'profilePage/ADD-POST'; //глобальная переменная типа для того, чтобы упростить (на самом деле это усложняет код)
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_STATUS = 'profilePage/SET_STATUS';
const DELETE_POST = 'profilePage/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profilePage/SAVE_PHOTO_SUCCESS'

let initialState = {
    posts: [
        { id: 1, message: 'Я что-то написал', likesCount: 2 },
        { id: 2, message: 'Привет мир', likesCount: 51 }
    ],
    profile: null,
    status: ''
} //значение по умолчанию

const profileReducer = (state = initialState, action) => {

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
        case DELETE_POST: {
            return {
                ...state,
                posts: [...state.posts.filter(post => post.id !== action.postId)]
            }
        }
        case SAVE_PHOTO_SUCCESS: {
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostElement) => ({type: ADD_POST, newPostElement}); //то же самое, что с ретурном
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE,profile})
export const setStatus = (status) => ({type: SET_STATUS,status})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS,photos})

//? thunk creator
export const getUserProfile = (userId) => async (dispatch) => {
    const response = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(response.data));
} //специально рядом оставил async-await и обычный промис для наглядности (по сути одно и то же)
export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data));
        })
    }
}
export const updateStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}
export const savePhoto = (file) => async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}


export default profileReducer;