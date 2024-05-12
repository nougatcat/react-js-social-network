import { profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST'; //глобальная переменная типа для того, чтобы упростить (на самом деле это усложняет код)
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts : [
        { id: 1, message: 'Я что-то написал', likesCount: 2 },
        { id: 2, message: 'Привет мир', likesCount: 51 }
    ],
    profile: null,
    status: ''
} //значение по умолчанию

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
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
        default:
            return state;
    }
}

export const addPostActionCreator = (newPostElement) => ({type: ADD_POST, newPostElement}); //то же самое, что с ретурном
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE,profile})
export const setStatus = (status) => ({type: SET_STATUS,status})
export const deletePost = (postId) => ({type: DELETE_POST, postId})

//? thunk creator
export const getUserProfile = (userId) => {
    return (dispatch) => {
        profileAPI.getUserProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        })
    }
}
export const getStatus = (userId) => {
    return (dispatch) => {
        profileAPI.getStatus(userId).then(response => {
            dispatch(setStatus(response.data));
        })
    }
}
export const updateStatus = (status) => (dispatch) => {
    profileAPI.updateStatus(status)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
}


export default profileReducer;