import { Dispatch } from "redux";
import { usersAPI } from '../api/usersAPI.ts';
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utilities/object-helpers.ts";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux-store";
import { ResultCodesEnum } from "../api/api.ts";
// import { ThunkAction } from "redux-thunk";

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


const usersReduser = (state = initialState, action: ActionsTypes): InitialStateActionType => {
    switch (action.type) {
         //?updateObjectInArray - хелпер, который маппит массив, вынесет, чтобы не писать два раза
        case 'usersPage/FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };
        }
        case 'usersPage/UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        }
        case 'usersPage/SET_USERS': { //обновление списка пользователей
            return {
                ...state,
                users: action.users
            }
        }
        case 'usersPage/SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case 'usersPage/SET_TOTAL_USERS_COUNT': {
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        }
        case 'usersPage/TOGGLE_IS_FETCHING': {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        case 'usersPage/TOGGLE_IS_FOLLOWING_PROGRESS': {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        case 'usersPage/SET_FILTER': {
            return {
                ...state,
                filter: action.payload
            }

        }
        default:
            return state;
    }
};

export const actions = {
    //? AC - action creator-ы 
    followSuccess: (userId: number) => { return ({ type: 'usersPage/FOLLOW', userId } as const) }, //запись с ретурн аналогична записи со скобкой (строкой ниже)
    unfollowSuccess: (userId: number) => ({ type: 'usersPage/UNFOLLOW', userId } as const),
    setUsers: (users: Array<UserType>) => ({ type: 'usersPage/SET_USERS', users } as const),
    setCurrentPage: (currentPage: number) => ({ type: 'usersPage/SET_CURRENT_PAGE', currentPage } as const),
    setTotalUsersCount: (totalUsersCount: number) => ({ type: 'usersPage/SET_TOTAL_USERS_COUNT', totalUsersCount } as const),
    toggleIsFetching: (isFetching: boolean) => ({ type: 'usersPage/TOGGLE_IS_FETCHING', isFetching } as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({ type: 'usersPage/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId } as const),
    setFilter: (filter: FilterType) => ({ type: 'usersPage/SET_FILTER', payload: filter } as const)
}




// type GetStateType = () => AppStateType //необязательно выносить это, можно просто писать getState: () => AppStatetype
//type DispatchType = Dispatch<ActionsTypes> //нужно для более сложного метода типизации thunk (отсавил для примера) (без использования ThunkType). Смотри _followUnfollowFlow


//? TC - thunk creator-ы
//ThunkAction<ReturnType, StateType, ExtraPayload, Action>
export const requestUsers = (page: number, pageSize: number, filter: any): ThunkType => { //это thunk creator
    return async (dispatch, getState) => { //это thunk
        //getState(). //должен может вернуть стейт целиком //?зачем?
        dispatch(actions.toggleIsFetching(true)); //помещаем прелоадер
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))

        usersAPI.getUsers(page, pageSize, filter.term, filter.friend).then(data => { //берем юзеров с учебного сайта
            dispatch(actions.toggleIsFetching(false)); //убираем прелоадер
            dispatch(actions.setUsers(data.items));
            dispatch(actions.setTotalUsersCount(data.totalCount));
        });
    }
}
//? на случай, если юзер не авторизован, кнопки follow и unfollow скрыты в ui
const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, 
                                    userId: number, 
                                    apiMethod: any, 
                                    actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId))
    const data = await apiMethod(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
}//? общий метод для follow и unfollow, чтобы не дублировать код
export const follow = (userId: number): ThunkType => {
    return async (dispatch) => {
        //bind так как будет выполняться в другом месте
        _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
    }
}
export const unfollow = (userId: number): ThunkType => {
    return async (dispatch) => {
        _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
    }
}


export type InitialStateActionType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>
type ThunkType = BaseThunkType<ActionsTypes> //вынесли конструкцию в redux-store

export default usersReduser;