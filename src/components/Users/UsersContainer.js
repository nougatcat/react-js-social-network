//Контейнерная компонента нужна для передачи в презентационную компоненту
//элементов стора и функций редюсера так, чтобы внутри презентационной компоненты
//не было зависимостей от реализации стора и редюсеров
//? тут, помимо этого, реализован доступ к серверу через ajax запросы

import React from 'react';
import { connect } from 'react-redux';
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow } from '../../redux/users-reducer';
import Users from './Users';
import axios from 'axios';
import Preloader from '../common/Preloader/Preloader';


//Первая часть контейнерной компоненты - передача данных из редакса
let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

//mapDispatchToProps зарефакторен прямо в экспорт


////////////////////////////////////////
//Вторая часть контейнерной компоненты - классовая компонента для работы с API сервера
class UsersContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { //сработает сразу после первой отрисовки рендером
        this.props.toggleIsFetching(true); //помещаем прелоадер
        //берем юзеров с учебного сайта
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false); //убираем прелоадер
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(response.data.items);
            });
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
                    follow={this.props.follow}
                    unfollow={this.props.unfollow}
                />
            </>
        )
    }
}


//export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

//mapDispatchToProps будет задаваться не отдельно, а сразу в коннект
export default connect(mapStateToProps,
    { // это mapDispatchToProps
        follow,
        unfollow,
        setUsers,
        setCurrentPage,
        setTotalUsersCount,
        toggleIsFetching
    }
)(UsersContainer);