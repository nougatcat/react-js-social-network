import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', //будет добавляться в начало у всех инстансов
    headers: { "API-KEY": "9952b53e-baae-4eb6-bf56-66454d" }
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
        }

}





