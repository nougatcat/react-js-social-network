
import { GetItemsType, instance, APIResponseType } from "./api.ts";





export const usersAPI = {
    //для UsersContainer //используется Thunk
    getUsers(currentPage = 1, pageSize = 5, term: string = '', friend: null | boolean = null) {
        //пример адреса https://social-network.samuraijs.com/api/1.0/users?page=1&count=10&term=dimych term - это фильтр
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? '' : `&friend=${friend}`))
            .then(response => response.data);
        //}).then(response => {return response.data}) или так
        //возвращаем не то, что вернул get, а то, что вернул then,
        //чтобы в респонсе было только то, что нужно, а не все, что присылает сервер
    },

    //для Users //используется Thunk
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`)
            .then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`).then(res => res.data) as Promise<APIResponseType>
    }
};


