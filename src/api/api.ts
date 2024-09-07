// import axios, { AxiosResponse } from 'axios';
import axios from 'axios'
import { apiKey } from './api-key';
import { UserType } from '../types/types';


export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/', //будет добавляться в начало у всех инстансов
    //headers: { "API-KEY": "getthisk-eyon-samu-raij-scomAA" } //зарегайся, чтобы получить ключ
    headers: { "API-KEY": apiKey }
})



export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodesForCaptchaEnum {
    CaptchaIsRequired = 10
}


export type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null    
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = { //здесь - если D не указано, то типа нету у data
    data: D;
    messages: Array<string>;
    resultCode: RC;
};

