import { usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST'; //глобальная переменная типа для того, чтобы упростить (на самом деле это усложняет код)
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts : [
        { id: 1, message: 'Я что-то написал', likesCount: 2 },
        { id: 2, message: 'Привет мир', likesCount: 51 }
    ],
    newPostText: 'Напишите что-нибудь',
    profile: null
} //значение по умолчанию

const profileReducer = (state = initialState, action) => {

    switch(action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost], //пушим пост, но он удаляется после перезагрузки страницы, т.к. нет бэкенда (в файл state изменения не записываются)
                newPostText: '' //зануляем текстареа
            };
        }
        case UPDATE_NEW_POST_TEXT: {  //в реальном времени считывает данные из текстареи и временно записывает в state, если не записывать, то данные пропадают, это нарушение flux архитектуры 
            return {
                ...state,
                newPostText : action.newText
            }
        }
        case SET_USER_PROFILE: {
            return {
                ...state,
                profile: action.profile
            }
        }
        default:
            return state;
    }
}

export const addPostActionCreator = () => ({type: ADD_POST}); //то же самое, что с ретурном
export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
}
const setUserProfile = (profile) => ({type: SET_USER_PROFILE,profile})

//? thunk creator
export const getUserProfile = (userId) => {
    return (dispatch) => {
        usersAPI.getUserProfile(userId).then(response => {
            dispatch(setUserProfile(response.data));
        })
    }
}

export default profileReducer;