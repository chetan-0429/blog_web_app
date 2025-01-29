import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';
import { getUrl } from '../action';

    export const login = createAsyncThunk(
        'auth/loginUser',
        async ({ username, password }, { rejectWithValue }) => {
            console.log('called',username)
            try {
                  let url = getUrl('/users/login');
                const response = await axios.post(url, { username, password }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('resp: ',response)
        console.log('resp data: ',response.data)
        // Assuming response.data contains { token: '...', user: {...} }
        return response.data;
      } catch (error) {
        // Handle errors appropriately
        console.log('error ',error)
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );

let token = localStorage.getItem('token') || null;
let user = null;
console.log('local: ',localStorage.getItem('user'))
 user = token ? localStorage.getItem('user') : null;



let initialState={
    token,
    isAuthenticated: !!localStorage.getItem('token'),
    user,
    error:null,
    loading:false
};

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
      update:(state,payload)=>{
        console.log('update: ',payload)
        console.log('update data: ',payload.payload)
        state.user = payload.payload,
        state.isAuthenticated = true,
        state.error = null
            },
        logout:(state)=>{
            state.token = null,
            state.isAuthenticated = false,
            state.error = null,
            state.user = null,
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            localStorage.setItem('token', action.payload.token);
            console.log('action: ',action.payload.user)
            localStorage.setItem('user', action.payload.user.username);
        })
        .addCase(login.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
})

export const {logout,update} = authSlice.actions;
export default authSlice.reducer;