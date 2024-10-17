import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import paginationReducer from "./pagination/paginationSlice";
import subscriptionReducer from "../redux/subscribe/subscriptionSlice";
import loadingReducer from "./loading/loadingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loading: loadingReducer,
    pagination: paginationReducer,
    subscription: subscriptionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
