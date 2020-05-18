import axios from "axios";
import {toast} from "react-toastify"

//axios interceptor--null first argument for {if fullfilled} second for error a caalbackfunction

axios.interceptors.response.use(null,error =>{
    const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
  if(!expectedError){

    toast.error("An unexpected error has occured");
  }
  return Promise.reject(error);
  })
 
  export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    
  }