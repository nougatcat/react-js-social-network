import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.pageNumbers}>
                {pages.map(page => {
                    return <span className={props.currentPage === page && styles.selectedPage}
                        onClick={() => props.onPageChanged(page)}>{page}</span>
                })}
            </div>
            {
                props.users.map(user =>
                    <div key={user.id}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} />
                                </NavLink>
                            </div>
                            <div>
                                {
                                    user.followed
                                        ? <button onClick={() => { 
                                            axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                                withCredentials: true,
                                                headers: {
                                                    "API-KEY" : "9952b53e-baae-4eb6-bf56-66454d"
                                                }
                                            })
                                            .then(response => {
                                                if (response.data.resultCode == 0) { //код 0 - сервер не вернул ошибку
                                                    props.unfollow(user.id)
                                                }
                                            });
                                        }}>Unfollow</button>
                                        : <button onClick={() => {
                                            axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                                withCredentials: true,
                                                headers: {
                                                    "API-KEY" : "9952b53e-baae-4eb6-bf56-66454d"
                                                }
                                            })
                                            .then(response => {
                                                if (response.data.resultCode == 0) {
                                                    props.follow(user.id);
                                                }
                                            });
                                        }}>Follow</button>
                                }
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </span>
                            <span>
                                <div>{'user.location.country'}</div>
                                <div>{'user.location.city'}</div>
                            </span>
                        </span>
                    </div>)
            }
        </div>
    )
}

export default Users;