import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utilities/object-helpers";

const FOLLOW = 'usersPage/FOLLOW';
const UNFOLLOW = 'usersPage/UNFOLLOW';
const SET_USERS = 'usersPage/SET_USERS';
const SET_CURRENT_PAGE = 'usersPage/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'usersPage/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'usersPage/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'usersPage/TOGGLE_IS_FOLLOWING_PROGRES';


let initialState = {
    users: [], //наполнится данными с сервера
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1, //активная страница
    isFetching: false, //получаем данные с сервера?
    followingInProgress: [] //для отслеживания нажатия кнопки follow на юзеров из массива
};

const usersReduser = (state = initialState, action) => {
    switch (action.type) {
        // case FOLLOW: {
        //     return {
        //         ...state,
        //         users: state.users.map(user => {
        //             if (user.id === action.userId) {
        //                 return { ...user, followed: true }
        //             }
        //             return user;
        //         })
        //     };
        // } //?создали хелпер, который делает то же самое, чтобы не дублировать код
        case FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        }
        case UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        }
        case SET_USERS: { //обновление списка пользователей
            return {
                ...state,
                users: action.users
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
};

//? AC - action creator-ы
//export const followAC = (userId) => ({type: FOLLOW, userId}); альт. запись. то же самое, что снизу
export const followSuccess = (userId) => { return ({ type: FOLLOW, userId }) };
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })

//? TC - thunk creator-ы
export const requestUsers = (page, pageSize) => { //это thunk creator
    return (dispatch) => { //это thunk
        dispatch(toggleIsFetching(true)); //помещаем прелоадер
        dispatch(setCurrentPage(page))
        usersAPI.getUsers(page, pageSize).then(data => { //берем юзеров с учебного сайта
            dispatch(toggleIsFetching(false)); //убираем прелоадер
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}
//? на случай, если юзер не авторизован, кнопки follow и unfollow скрыты в ui
const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) { //код 0 - сервер не вернул ошибку
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId));
}//? общий метод для follow и unfollow, чтобы не дублировать код
export const follow = (userId) => {
    return async (dispatch) => {
        //bind так как будет выполняться в другом месте
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}
export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
    }
}

//!Более простая прошлая версися follow/unfollow, которая не имеет дублирования кода, работает также
// export const follow = (userId) => {
//     return (dispatch) => {
//         dispatch(toggleFollowingProgress(true, userId));
//         usersAPI.follow(userId)
//             .then(response => {
//                 if (response.data.resultCode === 0) { //код 0 - сервер не вернул ошибку
//                     dispatch(followSuccess(userId))
//                 } 
//                 dispatch(toggleFollowingProgress(false, userId));
//             });
//     }
// }
// export const unfollow = (userId) => {
//     return (dispatch) => {
//         dispatch(toggleFollowingProgress(true, userId));
//         usersAPI.unfollow(userId)
//             .then(response => {
//                 if (response.data.resultCode === 0) { //код 0 - сервер не вернул ошибку
//                     dispatch(unfollowSuccess(userId))
//                 }
//                 dispatch(toggleFollowingProgress(false, userId));
//             });
//     }
// }








    export default usersReduser;