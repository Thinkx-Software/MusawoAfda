import Axios from 'axios';
const baseURL = 'https://dev.adfamedicareservices.com/appointmentBackend/public/index.php/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


//headers
let headers = {
  'Content-Type': 'application/json',
  'Accept':'application/json'
}



const axiosInstance = Axios.create({
    baseURL,
    headers
})
export default axiosInstance;

// Create axios client, pre-configured with baseURL
// let APIKit = axios.create({
//     baseURL: 'https://app.example.se',
//     timeout: 10000,
//   });
  
//   // Set JSON Web Token in Client to be included in all calls
  export const setClientToken = async () => {
      //console.log('call me always')
    const token = await AsyncStorage.getItem('token')
    try{
           if(token !== null){

            axiosInstance.interceptors.request.use(function(config) {
                config.headers.Authorization = `Bearer ${token}`;
                return config;
              });
           }
           else{
               return ;
           }
    }
    catch(error){
      console.log(`The error is ${error.messsage}`)
    }

  };

  setClientToken()