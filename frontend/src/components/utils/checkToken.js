import { logout,update } from "../../slices/authSlice";
import {jwtDecode} from 'jwt-decode';
// import axios from "axios";
// import { getUrl } from "../../action";
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
}


export default checkExpiry;