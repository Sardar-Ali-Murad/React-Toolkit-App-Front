import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: JSON.parse(localStorage.getItem('user')) || null,
    Image:"",
    userImage:"",
    Properties:[],
    userOrders:[]
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setupUser: (state,action) => {
       state.user=action.payload.user
    },
    actionBegin:(state)=>{
      state.isLoading=true
    },
    seeAlert:(state,action)=>{
      state.showAlert=true
      state.alertType=action.payload.alertType
      state.alertText=action.payload.alertText
      state.isLoading=false
    },
    removeAlert:(state)=>{
      state.showAlert=false
      state.alertText=""
      state.alertText=""
      state.isLoading=false
    },
    getCurrentUser:(state,action)=>{
      state.user=action.payload.user
    },
    logoutUser:(state)=>{
      state.user=null
    },

    loginUsingGoogle:(state,action)=>{
      state.user=action.payload.user
    },

    getAllPoperties:(state,action)=>{
      state.Properties=action.payload.data
    },

    getUserOrders:(state,action)=>{
      state.userOrders=action.payload.orders
    }
  },
})

// Action creators are generated for each case reducer function
export const { setupUser,seeAlert,removeAlert,getCurrentUser,logoutUser,loginUsingGoogle,actionBegin,getAllPoperties,getUserOrders } = counterSlice.actions

export default counterSlice.reducer