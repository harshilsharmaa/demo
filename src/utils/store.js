import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";
import filterSlice from "./slices/filterSlice";
import appSlice from "./slices/appSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        cart: cartSlice,
        app: appSlice
    }
})

export default store;