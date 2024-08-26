import { Dispatch } from "redux";
import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utilities/object-helpers";
import { AppStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";

const FOLLOW = 'usersPage/FOLLOW';
const UNFOLLOW = 'usersPage/UNFOLLOW';
const SET_USERS = 'usersPage/SET_USERS';
const SET_CURRENT_PAGE = 'usersPage/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'usersPage/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'usersPage/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'usersPage/TOGGLE_IS_FOLLOWING_PROGRES';
const SET_FILTER = 'usersPage/SET_FILTER'


type FilterType = {
    term: string | null
    friend: boolean | null
}
let initialState = {
    users: [] as Array<UserType>, //наполнится данными с сервера
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1, //активная страница
    isFetching: false, //получаем данные с сервера?
    followingInProgress: [] as Array<number>, //для отслеживания нажатия кнопки follow на юзеров из массива (содержит массив id-шек пользователей, на которых в данный момент подписываемся)
    filter: {
        term: '',
        friend: null
    } as FilterType
};
type InitialStateActionType = typeof initialState

const usersReduser = (state = initialState, action: ActionTypes): InitialStateActionType => {
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
        case SET_FILTER: {
            return {
                ...state,
                filter: action.payload
            }

        }
        default:
            return state;
    }
};

type ActionTypes = FollowSuccessActionType | UnfollowSuccessActionType | SetUsersActionType | SetCurrentPageActionType | SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType | SetFilterActionType


//? типы к AC-ам
type FollowSuccessActionType = { type: typeof FOLLOW, userId: number }
type UnfollowSuccessActionType = { type: typeof UNFOLLOW, userId: number }
type SetUsersActionType = { type: typeof SET_USERS, users: Array<UserType> }
type SetCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
type SetTotalUsersCountActionType = { type: typeof SET_TOTAL_USERS_COUNT, totalUsersCount: number }
type ToggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
type ToggleFollowingProgressActionType = { type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number }
type SetFilterActionType = {type: typeof SET_FILTER, payload: FilterType}

//? AC - action creator-ы 
export const followSuccess = (userId: number): FollowSuccessActionType => { return ({ type: FOLLOW, userId }) }; //запись с ретурн аналогична записи со скобкой (строкой ниже)
export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountActionType  => ({ type: SET_TOTAL_USERS_COUNT, totalUsersCount });
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressActionType => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId })
export const setFilter = (filter : FilterType): SetFilterActionType => ({type: SET_FILTER, payload: filter})


type GetStateType = () => AppStateType //необязательно выносить это, можно просто писать getState: () => AppStatetype
type DispatchType = Dispatch<ActionTypes> //аналогично, необязательный код
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

//? TC - thunk creator-ы
//ThunkAction<ReturnType, StateType, ExtraPayload, Action>
export const requestUsers = (page: number, pageSize: number, filter: any): ThunkType => { //это thunk creator
    return async (dispatch, getState) => { //это thunk
        //getState(). //должен может вернуть стейт целиком //?зачем?
        dispatch(toggleIsFetching(true)); //помещаем прелоадер
        dispatch(setCurrentPage(page))
        dispatch(setFilter(filter))

        usersAPI.getUsers(page, pageSize, filter.term, filter.friend).then(data => { //берем юзеров с учебного сайта
            dispatch(toggleIsFetching(false)); //убираем прелоадер
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}
//? на случай, если юзер не авторизован, кнопки follow и unfollow скрыты в ui
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccessActionType | UnfollowSuccessActionType) => {
    dispatch(toggleFollowingProgress(true, userId))
    const response = await apiMethod(userId)
    if (response.data.resultCode === 0) { //код 0 - сервер не вернул ошибку
        dispatch(actionCreator(userId))
    }
    dispatch(toggleFollowingProgress(false, userId));
}//? общий метод для follow и unfollow, чтобы не дублировать код
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        //bind так как будет выполняться в другом месте
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess)
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