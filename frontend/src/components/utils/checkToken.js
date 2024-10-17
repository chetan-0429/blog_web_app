import { logout,update } from "../../slices/authSlice";
import {jwtDecode} from 'jwt-decode';
import store from "../../store/store";
import axiosInstance from "./axiosConfig";
import axios from "axios";
import { getUrl } from "../../action";

 function checkExpiry(){
    console.log('cek')
    const auth = store.getState().auth;
    const token = auth.token;
    console.log('token: ',token)
    if(token=='undefined' || token==null){
        store.dispatch(logout());
        return;
    }
    else{
        const decode = jwtDecode(token);
        const currentTime =  Date.now() / 1000;
        if(decode.exp < currentTime){
            console.log('expired token')
            store.dispatch(logout());
        }
        else{
            checkToken(token);
        }
    }
}

async function checkToken(token) {
    
    console.log('chkkt',token)
    try{
        // const res = await axiosInstance.get('/users/checkToken');
        const url = getUrl('/users/checkToken');    //'http://localhost:5000/api/users/checkToken'
      console.log('hllllllll')
        const res = await axios.get(url,{
            headers:{
                'Authorization':`Bearer ${token}`,
            }
        });
        console.log('checkkkkkkkkkkk',res)
        if(res.data.success){
            const user = res.data.user;
            store.dispatch(update(user))
        }
        console.log('res in validating token: ',res.data);

    }catch(err){
        console.log('error in checking token or invalid token  ',err)
        store.dispatch(logout());
    }
}

export default checkExpiry;