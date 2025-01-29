import { logout,update } from "../../slices/authSlice";
import {jwtDecode} from 'jwt-decode';
// import store from "../../store/store";
// import axiosInstance from "./axiosConfig";
// import axios from "axios";
// import { getUrl } from "../../action";
// import { logout } from "../../slices/authSlice";
import store from "../../store/store";

 function checkExpiry(){
    try {
        const token = store.getState().auth.token; 
    
        if (!token) {
          return; 
        }
    
        const decoded = jwtDecode(token); 
    
        const currentTime = Date.now() / 1000; 
        if (decoded.exp < currentTime) {
          console.warn("Token has expired");
          store.dispatch(logout()); 
        } else {
        }
      } catch (error) {
        console.error("Error checking token expiration:", error);
      }
    // console.log('cek')
    // const auth = store.getState().auth;
    // const token = auth.token;
    // console.log('token: ',token)
    // if(token=='undefined' || token==null){
    //     store.dispatch(logout());
    //     return;
    // }
    // else{
    //     const decode = jwtDecode(token);
    //     const currentTime =  Date.now() / 1000;
    //     if(decode.exp < currentTime){
    //         console.log('expired token')
    //         store.dispatch(logout());
    //     }
    //     else{
    //         checkToken(token);
    //     }
    // }
}

// async function checkToken(token) {
    
//     console.log('chkkt',token)
//     try{
//         // const res = await axiosInstance.get('/users/checkToken');
//         const url = getUrl('/users/checkToken');    //'http://localhost:5000/api/users/checkToken'
//         const res = await axios.get(url,{
//             headers:{
//                 'Authorization':`Bearer ${token}`,
//             }
//         });
//         console.log('checkkkkkkkkkkk',res)
//         if(res.data.success){
//             const user = res.data.user;
//             store.dispatch(update(user))
//         }
//         console.log('res in validating token: ',res.data);

//     }catch(err){
//         console.log('error in checking token or invalid token  ',err)
//         store.dispatch(logout());
//     }
// }

export default checkExpiry;