import React from 'react';
import styles from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';
import User from './User';

let Users = (props) => {

    return (
        <div className={styles.wrapper}>
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