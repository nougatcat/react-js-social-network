//Контейнерная компонента нужна для передачи в презентационную компоненту
//элементов стора и функций редюсера так, чтобы внутри презентационной компоненты
//не было зависимостей от реализации стора и редюсеров

import React from 'react';
import { connect } from 'react-redux';
import { follow, followSuccess, requestUsers, setCurrentPage, toggleFollowingProgress, unfollow, unfollowSuccess } from '../../redux/users-reducer.ts';
import Users from './Users.tsx';
import Preloader from '../common/Preloader/Preloader.jsx';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors.ts';
import { UserType } from '../../types/types.ts';
import { AppStateType } from '../../redux/redux-store.ts';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';

type MapStatePropsType = {
    //свойства
    currentPage: number 
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    isAuth: boolean
    followingInProgress: Array<number>
    filter: any //! урок113
}
type MapDispatchPropsType = {
    //коллбеки
    requestUsers: (page: number,pageSize: number, filter: any) => void
    unfollow: (id: number) => void
    follow: (id: number) => void
    // followSuccess: Function //! урок113
    // unfollowSuccess: Function //! урок113
}
type OwnPropsType = {
    pageTitle: string //передано из App.js
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

//////////////////////////////////////////////////////////

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state), //Reselect
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: state.auth.isAuth,
        filter: getUsersFilter(state)
    }
}
//mapDispatchToProps зарефакторен прямо в экспорт

//классовая компонента для работы с API сервера
class UsersContainer extends React.Component<PropsType> {

    componentDidMount() { //сработает сразу после первой отрисовки рендером
        const {currentPage, pageSize, filter} = this.props
        this.props.requestUsers(currentPage,pageSize, filter);
    } //так как componentDidMount и onPageChanged здесь делают примерно одно и то же, я объединил все, что они делают, в одну функцию requestUsersThunkCreator
    onPageChanged = (pageNumber: number) => {
        //this.props.requestUsers(pageNumber,this.props.pageSize);
        const {pageSize, filter} = this.props //эти две строки аналогичны тому, что закомментировано сверху. Важно писать {}, иначе не будет корректно работать
        this.props.requestUsers(pageNumber,pageSize,filter);
    }
    onFilterChanged = (filter) => {
        const {pageSize} = this.props
        this.props.requestUsers(1,pageSize,filter)
    }



    render() {
        return ( //в эту компоненту методы пришли через коннект, но дальше их надо передать вручную 
            //<> - обертка для Users 
            <>
                <h2>{this.props.pageTitle}</h2>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    onFilterChanged={this.onFilterChanged}
                    users={this.props.users}
                    //followSuccess={this.props.followSuccess} //! это нужно? смотри урок 113
                    //unfollowSuccess={this.props.unfollowSuccess}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress = {this.props.followingInProgress}
                    //toggleFollowingProgress={this.props.toggleFollowingProgress}
                    isAuth={this.props.isAuth}
                />
            </>
        )
    }
}

//export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

export default compose(
    // withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        { // это mapDispatchToProps т.е. это не импорты, а коллбэки
            //followSuccess,
            //unfollowSuccess,
            requestUsers,
            follow,
            unfollow
        })
)(UsersContainer)