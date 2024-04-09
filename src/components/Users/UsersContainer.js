//Контейнерная компонента нужна для передачи в презентационную компоненту
//элементов стора и функций редюсера так, чтобы внутри презентационной компоненты
//не было зависимостей от реализации стора и редюсеров
//? тут, помимо этого, реализован доступ к серверу через ajax запросы

import React from 'react';
import { connect } from 'react-redux';
import { follow, followSuccess, getUsers, setCurrentPage, toggleFollowingProgress, unfollow, unfollowSuccess } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';


//Первая часть контейнерной компоненты - передача данных из редакса
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        isAuth: state.auth.isAuth
    }
}

//mapDispatchToProps зарефакторен прямо в экспорт


////////////////////////////////////////
//Вторая часть контейнерной компоненты - классовая компонента для работы с API сервера
class UsersContainer extends React.Component {

    componentDidMount() { //сработает сразу после первой отрисовки рендером
        this.props.getUsers(this.props.currentPage,this.props.pageSize);
    } //так как componentDidMount и onPageChanged здесь делают примерно одно и то же, я объединил все, что они делают, в одну функцию getUsersThunkCreator
    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber,this.props.pageSize);
    }
    



    render() {
        return ( //в эту компоненту методы пришли через коннект, но дальше их надо передать вручную 
            //<> - обертка для Users 
            <>
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    followSuccess={this.props.followSuccess}
                    unfollowSuccess={this.props.unfollowSuccess}
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                    followingInProgress = {this.props.followingInProgress}
                    toggleFollowingProgress={this.props.toggleFollowingProgress}
                    isAuth={this.props.isAuth}
                />
            </>
        )
    }
}


//export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

//mapDispatchToProps будет задаваться не отдельно, а сразу в коннект
export default connect(mapStateToProps,
    { // это mapDispatchToProps
        followSuccess,
        unfollowSuccess,
        setCurrentPage,
        toggleFollowingProgress,
        getUsers,
        follow,
        unfollow
    }
)(UsersContainer);