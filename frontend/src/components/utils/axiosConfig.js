import axios from "axios";
import store from "../../store/store";

const API_BASE_URL = 'http://localhost:5000'

const axiosInstance = axios.create({
    baseURL:API_BASE_URL
})

axiosInstance.interceptors.request.use((config)=>{
    const token = store.getState().auth.token;
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return token;
},(err)=>{
    return Promise.reject(err);
});

axiosInstance.interceptors.response.use((response)=>response,(err)=>{
    if(err.response && err.response.status == 401){
        store.dispatch({type:'auth/logout'});
    }
    return Promise.reject(err);
})

export default axiosInstance;