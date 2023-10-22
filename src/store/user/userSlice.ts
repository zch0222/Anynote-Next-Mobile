import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "@/types/authTypes";

const initialState: UserInfo = {
    username: "test",
    nickname: "",
    role: "",
    avatar: "",
    token: null
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo>) => {
            return action.payload;
        },
        clearUserInfo: (state) => {
            return initialState
        }
    }
})

export const { setUserInfo } = userSlice.actions

export default userSlice.reducer