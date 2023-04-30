import { configureStore } from "@reduxjs/toolkit";
import Reducer from "./reducer";
import listenerMiddleware from "./listener";
export const store = configureStore({
    reducer:{
        app: Reducer
    },
    middleware:(getDefaultMiddlware)=>getDefaultMiddlware().prepend(listenerMiddleware.middleware)
})

