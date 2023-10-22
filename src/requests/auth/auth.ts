import request, { Method } from "@/utils/request";

import { LoginRequest, UserInfo } from "@/types/authTypes";
import { ResData } from "@/types/requestTypes";

export const loginUrl = "/api/auth/login"

export function login(params: LoginRequest) {
    return  request<ResData<UserInfo>>({
        url: loginUrl,
        method: Method.POST,
        needToken: false,
        data: params
    })
}