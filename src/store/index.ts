import {AnyAction, combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "@/store/user/userSlice";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {createWrapper, HYDRATE} from "next-redux-wrapper";


const reducer = combineReducers({
    user: userReducer
});

const rootReducer = (state: any, action: AnyAction) => {
    if (action.type === HYDRATE) {
        return {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
    } else {
        return reducer(state, action);
    }
}
const isServer = typeof window === "undefined";
export const makeStore = () => {
    // 区分客户端和服务端，服务端不需要持久化，客户端持久化在localStorage
    if (isServer) {
        return configureStore({
            reducer: rootReducer,
            devTools: true
        });
    }
    else {
        const persistConfig = {
            key: "anynote-next-mobile",
            witheList: ["user"],
            storage
        }
        const persistedReducer = persistReducer(persistConfig, rootReducer);
        const store = configureStore({
            reducer: persistedReducer,
            devTools: process.env.NODE_ENV !== "production",
            middleware: getDefaultMiddleware =>
                getDefaultMiddleware({
                    serializableCheck: false
                })
        });
        // // @ts-ignore 只使用客户端渲染不需要此种做法，只需导出persistor即可；
        // store.__persistor = persistStore(store);
        return store;
    }
}



export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export const wrapper = createWrapper(makeStore);