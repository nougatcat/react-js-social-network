import axios from 'axios';




//функция для UsersContainer
export const getUsers = (currentPage = 1, pageSize = 5) => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        {
            withCredentials: true
        }).then(response => response.data);
    //}).then(response => {return response.data}) или так
    //возвращаем не то, что вернул get, а то, что вернул then,
    //чтобы в респонсе было только то, что нужно, а не все, что присылает сервер
}

//для HeaderContainer
export const getMyProfileData = () => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
        withCredentials: true
    }).then(response => response.data);
}
