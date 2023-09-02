import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState:{
        isOpenSidebar: false
    },
    reducers:{
        toogleSidebar: (state, action)=>{
            state.isOpenSidebar = !state.isOpenSidebar
        }
    }
})

export const {toogleSidebar} = appSlice.actions
export default appSlice.reducer;