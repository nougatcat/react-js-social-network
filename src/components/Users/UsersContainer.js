//Контейнерная компонента нужна для передачи в презентационную компоненту
//элементов стора и функций редюсера так, чтобы внутри презентационной компоненты
//не было зависимостей от реализации стора и редюсеров
//? тут, помимо этого, реализован доступ к серверу через ajax запросы

import React from 'react';
import { connect } from 'react-redux';
import { follow, followSuccess, requestUsers, setCurrentPage, toggleFollowingProgress, unfollow, unfollowSuccess } from '../../redux/users-reducer.ts';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors';
// import { withAuthRedirect } from '../../hoc/withAuthRedirect';


//Первая часть контейнерной компоненты - передача данных из редакса
// let mapStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//         isAuth: state.auth.isAuth
//     }
// }
let mapStateToProps = (state) => {
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


////////////////////////////////////////
//Вторая часть контейнерной компоненты - классовая компонента для работы с API сервера
class UsersContainer extends React.Component {

    componentDidMount() { //сработает сразу после первой отрисовки рендером
        const {currentPage, pageSize, filter} = this.props
        this.props.requestUsers(currentPage,pageSize, filter);
    } //так как componentDidMount и onPageChanged здесь делают примерно одно и то же, я объединил все, что они делают, в одну функцию requestUsersThunkCreator
    onPageChanged = (pageNumber) => {
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
                {this.props.isFetching ? <Preloader /> : null}
                <Users
                    totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageChanged={this.onPageChanged}
                    onFilterChanged={this.onFilterChanged}
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

export default compose(
    // withAuthRedirect,
    connect(mapStateToProps,
        { // это mapDispatchToProps т.е. это не импорты, а коллбэки
            followSuccess,
            unfollowSuccess,
            setCurrentPage,
            toggleFollowingProgress,
            requestUsers,
            follow,
            unfollow
        })
)(UsersContainer)