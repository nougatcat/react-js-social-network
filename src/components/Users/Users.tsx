import React from 'react';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator.tsx';
import User from './User.jsx';
import UsersSearchForm from './UsersSearchForm.jsx';
import { UserType } from '../../types/types.ts';

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    unfollow: (id: number) => void
    follow: (id: number) => void
    isAuth: boolean
    onFilterChanged: (filter: any) => void
}


let Users: React.FC<PropsType> = (props) => {

    return (
        <div className={styles.wrapper}>
            <UsersSearchForm onFilterChanged={props.onFilterChanged} />
            <Paginator currentPage={props.currentPage}
                onPageChanged={props.onPageChanged}
                totalItemsCount={props.totalUsersCount}
                pageSize={props.pageSize}/>
            {
                props.users.map(user => <User user={user}
                                            key={user.id} //key - сервисная переменная для индексации, нужна чтобы не отрисовывалось то, что уже отрисовано. в компоненте не используется вручную
                                            followingInProgress={props.followingInProgress}
                                            unfollow={props.unfollow}
                                            follow={props.follow}
                                            isAuth={props.isAuth}/>
                )
            }
        </div>
    )
}

export default Users;