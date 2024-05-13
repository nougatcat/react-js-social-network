import axios from 'axios';
import { apiKey } from './api-key';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', //будет добавляться в начало у всех инстансов
    //headers: { "API-KEY": "getthisk-eyon-samu-raij-scomAA" } //зарегайся, чтобы получить ключ
    headers: { "API-KEY": apiKey }
})

export const usersAPI = {
    //для UsersContainer //используется Thunk
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
        //}).then(response => {return response.data}) или так
        //возвращаем не то, что вернул get, а то, что вернул then,
        //чтобы в респонсе было только то, что нужно, а не все, что присылает сервер
    },

    //для Users //используется Thunk
    follow(userId) { 
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
        return instance.delete(`follow/${userId}`)
    },
    getUserProfile(userId = 1) {
        console.warn('Obsolete method. Use profileAPI.getUsersProfile instead')
        return profileAPI.getUserProfile(userId)
    }
}

export const profileAPI = {
    //для ProfileContainer //пока не используется Thunk /переместить
    getUserProfile(userId = 1) {
        return axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)
    },
    getStatus(userId) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status) {
        return instance.put('profile/status/', {status: status}) //отправляем на сервер объект со свойством status 
    }
}

export const authAPI = {
        me() {
            return instance.get(`auth/me`)
                .then(response => response.data);
        },
        login(email, password, rememberMe = false) {
            return instance.post(`auth/login`, {email, password, rememberMe})
        },
        logout() {
            return instance.delete(`auth/login`)
        }
}





