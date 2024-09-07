import { PhotosType, ProfileType } from './../types/types';
import { instance, APIResponseType } from "./api.ts";
import axios from 'axios';


type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const profileAPI = {
    //для ProfileContainer //пока не используется Thunk /переместить
    getUserProfile(userId = 1) {
        return axios.get<ProfileType>(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>('profile/status/' + userId).then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>('profile/status/', {status: status}).then(res => res.data) //?отправляем на сервер объект со свойством status 
    },
    savePhoto(photoFile: any) {
        const formData = new FormData()
        formData.append('image', photoFile) //согласно api, свойство image и тип у него file
        return instance.put<APIResponseType<SavePhotoResponseDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>('profile', profile).then(res => res.data) //?отправляем на сервер объект структуры profile
    }
}
