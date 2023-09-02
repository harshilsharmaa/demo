import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        items: [],
        totalAmount: 0
    },
    reducers:{
        addItem: (state, action)=>{
            const {product, quantity} = action.payload;
            const itemPresent = state.items.findIndex((item)=>item.id===product.id);
            if(itemPresent==-1){
                state.items.unshift({...product, quantity});
                state.totalAmount += product.discountPrice;
            }
        },
        removeItem: (state, action)=>{
            const itemPresent = state.items.findIndex((item)=>item.id===action.payload);
            if(itemPresent!=-1){
                state.totalAmount -= (state.items[itemPresent].discountPrice*state.items[itemPresent].quantity);
                state.items.splice(itemPresent, 1);
            } 
        },
        increaseQuantity: (state, actions)=>{
            const itemPresent = state.items.findIndex((item)=>item.id===actions.payload);
            state.items[itemPresent].quantity += 1;
            state.totalAmount += state.items[itemPresent].discountPrice;
        },
        decreaseQantity: (state, actions)=>{
            const itemPresent = state.items.findIndex((item)=>item.id===actions.payload);
            if(state.items[itemPresent].quantity>1){
                state.items[itemPresent].quantity -= 1;
                state.totalAmount -= state.items[itemPresent].discountPrice;
            }
        },
        orderPlaced: (state, actions)=>{
            state.items = [];
            state.totalAmount = 0;
        }
    }
})

export const {addItem, removeItem, increaseQuantity, decreaseQantity, orderPlaced} = cartSlice.actions;
export default cartSlice.reducer;