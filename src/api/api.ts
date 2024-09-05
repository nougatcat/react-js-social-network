import axios, { AxiosResponse } from 'axios';
import { apiKey } from './api-key';
import { ProfileType } from '../types/types';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', //будет добавляться в начало у всех инстансов
    //headers: { "API-KEY": "getthisk-eyon-samu-raij-scomAA" } //зарегайся, чтобы получить ключ
    headers: { "API-KEY": apiKey }
})

export const usersAPI = {
    //для UsersContainer //используется Thunk
    getUsers(currentPage = 1, pageSize = 5, term = '', friend = null) {
        //пример адреса https://social-network.samuraijs.com/api/1.0/users?page=1&count=10&term=dimych term - это фильтр
        return instance.get(`users?page=${currentPage}&count=${pageSize}&term=${term}`+(friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data);
        //}).then(response => {return response.data}) или так
        //возвращаем не то, что вернул get, а то, что вернул then,
        //чтобы в респонсе было только то, что нужно, а не все, что присылает сервер
    },

    //для Users //используется Thunk
    follow(userId: number) { 
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId: number) {
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
    getStatus(userId: number) {
        return instance.get('profile/status/' + userId)
    },
    updateStatus(status: string) {
        return instance.put('profile/status/', {status: status}) //?отправляем на сервер объект со свойством status 
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile) //согласно api, свойство image и тип у него file
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
    },
    saveProfile(profile: ProfileType) {
        return instance.put('profile', profile) //?отправляем на сервер объект структуры profile
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

//!протипизировали возвращаемые типы только для authAPI, остальные api можно по аналогии протипизировать, смотри на сайте самурай что должно быть в респонсе и пиши тип (ДЗ)
type MeResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}
type LoginMeResponseType = {
    data: {userId: number}
    resultCode: ResultCodesEnum | ResultCodesForCaptcha,
    messages: Array<string>
}

export const authAPI = {
        me() {
            return instance.get<MeResponseType>(`auth/me`)
                .then(response => response.data);
        },
        login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
            return instance.post<LoginMeResponseType>(`auth/login`, {email, password, rememberMe, captcha})
                .then(response => response.data)
        },
        logout() {
            return instance.delete(`auth/login`)
        }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
    }
}

// authAPI.me().then((response: AxiosResponse<MeResponseType>) => response.data)



