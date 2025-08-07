import axios from "axios";
import { axiosResponseBody, getAuthorizationHeader } from "./agent";
import { ChangePasswordValues, UploadProfilePictureDto, UserLogin } from "../models/auth";
import { MuslimWikiSession, RegistrationUserDto, SessionUser } from "../typings";

export const authApi = {
    validateToken: (token: string) =>
        axios.get<SessionUser>(`/auth/validateToken`, getAuthorizationHeader(token)).then(axiosResponseBody),
    login: (values: UserLogin) =>
        axios.post<MuslimWikiSession>(`/auth/login`, { values }).then(axiosResponseBody),
    register: (values: RegistrationUserDto, lang: string | undefined) =>
        axios.post<MuslimWikiSession>(`/auth/register?lang=${lang ?? 'en'}`, { values }).then(axiosResponseBody),
    uploadProfilePicture: (token: string, values: UploadProfilePictureDto) =>
        axios.patch<MuslimWikiSession>(
            `/auth/uploadProfilePicture`, 
            { values },
            getAuthorizationHeader(token))
            .then(axiosResponseBody),
    verifyEmail: (token: string, id: string) =>
        axios.put<MuslimWikiSession>(
            `/auth/verifyEmail`, 
            { values: { id } }, 
            getAuthorizationHeader(token))
            .then(axiosResponseBody),
    changePassword: (values: ChangePasswordValues) =>
        axios.post<MuslimWikiSession>(`/auth/changePassword`, { values }).then(axiosResponseBody),
}