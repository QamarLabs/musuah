import axios from "axios";
// import { PaginatedResult } from "../models/common";
import { axiosResponseBody } from "./agent";
import { ChangePasswordValues, User, UserLogin } from "../models/auth";
import { RegistrationUserDto } from "../typings";

export const authApi = {
    login: (values: UserLogin) =>
        axios.post<User>(`/auth/login`, { values }).then(axiosResponseBody),
    register: (values: RegistrationUserDto, lang: string | undefined) =>
        axios.post<User>(`/auth/register?lang=${lang ?? 'en'}`, { values }).then(axiosResponseBody),
    verifyEmail: (token: string, id: string) =>
        axios.put<User>(
            `/auth/verifyEmail`, 
            { values: { id } }, 
            { 
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(axiosResponseBody),
    changePassword: (values: ChangePasswordValues) =>
        axios.post<User>(`/auth/changePassword`, { values }).then(axiosResponseBody),
}