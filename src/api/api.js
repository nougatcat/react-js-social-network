import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', //будет добавляться в начало у всех инстансов
    //headers: { "API-KEY": "9952b53e-baae-4eb6-bf56-66454d" }
})
const instance2 = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', //будет добавляться в начало у всех инстансов
    headers: { "API-KEY": "9952b53e-baae-4eb6-bf56-66454d" }
})

export const usersAPI = {
    //для UsersContainer
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
        //}).then(response => {return response.data}) или так
        //возвращаем не то, что вернул get, а то, что вернул then,
        //чтобы в респонсе было только то, что нужно, а не все, что присылает сервер
    },

    //для HeaderContainer
    getMyProfileData() {
        return instance.get(`auth/me`)
            .then(response => response.data);
    },

    //для ProfileContainer
    getProfileInfo(userId = 1) {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
            .then(response => response.data);
    },

    //для Users (не работает и не используется)
    deleteSubscription(id = 1) {
        instance2.delete(`follow/${id}`)
            .then(response => response.data);
    },
    postSubscription(id = 1) {
        instance2.post(`follow/${id}`)
            .then(response => response.data);
    }
}





