import axios from 'axios';





export const getUsers = (currentPage = 1 , pageSize = 5) => {
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`,
        { withCredentials: true })
}
