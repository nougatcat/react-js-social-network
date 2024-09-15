import React, { useEffect } from 'react';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator.tsx';
import User from './User.tsx';
import UsersSearchForm from './UsersSearchForm.tsx';
import { FilterType, requestUsers, follow, unfollow } from '../../redux/users-reducer.ts';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersSelector } from '../../redux/users-selectors.ts';
import { AppDispatch } from '../../redux/redux-store.ts';
import { getIsAuthSelector } from '../../redux/auth-selectors.ts';

type PropsType = {

}


export const Users: React.FC<PropsType> = (props) => {

    //useSelector и useDispatch нужны вместо переброски пропсов
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsersSelector)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isAuth = useSelector(getIsAuthSelector)

    const dispatch: AppDispatch = useDispatch()

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
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])



    return (
        <div className={styles.wrapper}>
            <UsersSearchForm onFilterChanged={onFilterChanged} />
            <Paginator currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}/>
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
