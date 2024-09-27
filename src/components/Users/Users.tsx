import React, { useEffect } from 'react';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator.tsx';
import User from './User.tsx';
import UsersSearchForm from './UsersSearchForm.tsx';
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsersFilter, getUsersSelector } from '../../redux/users-selectors.ts';
import { AppDispatch } from '../../redux/redux-store.ts';
import { getIsAuthSelector } from '../../redux/auth-selectors.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import * as queryString from 'querystring'
import Preloader from '../common/Preloader/Preloader.tsx';

type QueryParamsType = { term?: string, page?: string, friend?: string }
// type UsersPagePropsType = {
//     pageTitle: string //передано из App.js
// }

export const Users: React.FC = () => {

    //useSelector и useDispatch нужны вместо переброски пропсов
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsersSelector)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isAuth = useSelector(getIsAuthSelector)
    const isFetching = useSelector(getIsFetching)

    const dispatch: AppDispatch = useDispatch()

    const navigate = useNavigate()
    const location = useLocation()

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    } 
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1,pageSize,filter))
    }
    const _follow = (id: number) => {
        dispatch(follow(id))
    }
    const _unfollow = (id: number) => {
        dispatch(unfollow(id))
    }

    //вместо componentDidMount из контейнерной компоненты
    useEffect(() => {

        const parsed = queryString.parse(location.search.substring(1)) as QueryParamsType //парсим параметры из адресной строки и сохраняем в parsed
        //substring(1) значит мы начинаем с 1го символа, а не с 0го, то есть пропускаем знак "?"

        let actualPage = currentPage
        let actualFilter = filter
        if (!!parsed.page) actualPage = Number(parsed.page) //двойное !! конвертирует в логическое выражение, в данном случае необязательно, т.к. и без !! if поймет что имеется ввиду "существует" или "не существует"
        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}
        switch(parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = { ...actualFilter, friend: true }
                break;
            case "false":
                actualFilter = { ...actualFilter, friend: false }
                break;
        }
        // if (!!parsed.friend) actualFilter = {...actualFilter, friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false } //то же самое, что со switch case, но короче
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(()=> {

        const query: QueryParamsType = {}
        if(!!filter.term) query.term = filter.term
        if(filter.friend !== null) query.friend = String(filter.friend)
        if (currentPage !== 1) query.page = String(currentPage)


        navigate({
            pathname: '/users',
            // search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
            search: queryString.stringify(query) //автоматически создаст, то что вручную писал строкой выше //этот метод лучше, потому что не записывает "мусор" в адресную строку
        })
    },[filter, currentPage])



    return (
        <div className={styles.wrapper}>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}/>
            {isFetching ? <Preloader /> : null}
            {
                users.map(user => <User user={user}
                                            key={user.id} //key - сервисная переменная для индексации, нужна чтобы не отрисовывалось то, что уже отрисовано. в компоненте не используется вручную
                                            followingInProgress={followingInProgress}
                                            unfollow={_unfollow}
                                            follow={_follow}
                                            isAuth={isAuth}/>
                )
            }
        </div>
    )
}
