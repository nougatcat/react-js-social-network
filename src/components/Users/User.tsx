import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import { UserType } from '../../types/types';
import { Button } from 'antd';

type PropsType = {
    user: UserType
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isAuth: boolean

}


let User: React.FC<PropsType> = ({ user, followingInProgress, follow, unfollow, isAuth }) => {

    return (
        <div className={styles.user}>
            <div className={styles.user_icon}>
                <NavLink to={'/profile/' + user.id}>
                    <img alt="userphoto" src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                </NavLink>
            </div>

            <div className={styles.user_name}>
                <NavLink className={styles.linkToProfile} to={'/profile/' + user.id}>
                    {user.name}
                </NavLink>
                <div>
                    {
                        isAuth ? //кнопки follow и unfollow есть только если юзер авторизован (этого не было в уроках, я сам добавил)
                            user.followed
                                ? <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    unfollow(user.id);
                                }}>Отписаться</Button>
                                : <Button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                                    follow(user.id);
                                }}>Подписаться</Button>
                            : ''
                    }
                </div>
            </div>
            <div className={styles.user_status}>{user.status}</div>
            <div className={styles.user_id}>id: {user.id}</div>
        </div>
    )
}

export default User;