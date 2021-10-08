import {createSlice} from "@reduxjs/toolkit";
import { confirmCode, loginUser, registerUser, resendCode , sendEmail, forgotPasswordOtp, updatePassword} from "./actions";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        //work on user
        //work on user
        user:{
            isLoggedIn:false,
            isNormalUser:false,
            isHealthWorker:false,
            userInfo:null,
            errorMessageLogin:null,
            errorMessageRegister:null,
            loadingLogin:false,
            loadingRegister:false,
            registerSuccess:null,
            errorMessageOtp:null,
            loadingOtp:false,
            //resendcode
            loadingResendCode:false,
            errorResendCode:null,
            resentCodeMessage:null,
    
            //resend code
            //sendemail
             emailSuccess:null,
             emailFailure:null,
            //sendemail
            //otp
            forgotPassswordOtpSuccess:null,
            forgotPassswordOtpFailure:null,
            //opt

            //updatepassword
            updatePasswordSuccess:null,
            updatePasswordFailure:null
            //update password



        }
    },
    reducers:{
        logOut:(state)=>{
            state.user.isNormalUser = false
            state.user.isHealthWorker = false
            state.user.isLoggedIn = false
            state.user.userInfo = null
            //remove any error messages
            state.errorMessageLogin = null
            state.errorMessageOtp = null
            state.errorMessageRegister = null
            //remove any error messages
        },
        clearLoginErrror:(state)=>{
            state.user.errorMessageLogin = null
        },
        clearRegisterError:(state)=>{
              state.user.errorMessageRegister = null
        },
        clearOtpError:(state)=>{
            state.user.errorMessageOtp = null
        },
        clearEmailDetails:(state)=>{
            state.user.emailFailure = null
            state.user.emailSuccess = null
        },
        clearForgotOtp:(state)=>{
            state.user.forgotPassswordOtpFailure =null
            state.user.forgotPassswordOtpSuccess = null
        },
        clearUpdatePassword:(state)=>{
            state.user.updatePasswordFailure = null
            state.user.updatePasswordSuccess = null
        },
        clearRegisterSucess:(state)=>{
            state.user.registerSuccess = null
        },

        
    },
    extraReducers:{
        //register
        [registerUser.pending]:(state,{payload})=>{
            state.user.loadingRegister = true
            state.user.errorMessageRegister = null
            state.user.userInfo = null
            state.user.errorMessageLogin = null
            state.user.errorMessageOtp = null
        },
        [registerUser.fulfilled]:(state,{payload})=>{
            state.user.loadingRegister = false
            state.user.registerSuccess = payload

        },
        [registerUser.rejected]:(state,{payload})=>{
            //console.log(`The payload of register is ${payload}`)
            // if(payload.length > 25){
            //     payload = payload.split("")
            // }
            state.user.userInfo = null
            state.user.errorMessageRegister = payload
            state.user.loadingRegister = false
        },
        //register

        //login
        [loginUser.pending]:(state)=>{
            state.user.loadingLogin = true
            state.user.errorMessageLogin= null
            state.user.userInfo = null
        },
        [loginUser.fulfilled]:(state,{payload})=>{

            state.user.loadingLogin = false
            state.user.isLoggedIn = true
            if( Array.isArray(payload)){
               state.user.isHealthWorker = false;
               state.user.isNormalUser = true
               state.user.userInfo = payload[0]
            }
            else{
                state.user.isHealthWorker = true;
                state.user.isNormalUser = false
                state.user.userInfo = payload
            }
            
            

        },
        [loginUser.rejected]:(state,{payload})=>{
            
            state.user.loadingLogin = false
            state.user.userInfo = null
            state.user.errorMessageLogin = payload
        },
        //login

        //confirm code
        [confirmCode.pending]:(state)=>{
             state.user.loadingOtp = true
             state.errorMessageOtp = null
             state.errorMessageLogin = null
             state.errorMessageRegister = null


        },
        [confirmCode.fulfilled]:(state,{payload})=>{
        
            state.user.loadingOtp = false
            state.user.errorMessageOtp = null
            state.user.registerSuccess = null
            //check if user is a doctor
            //check if user is not a doctor
            state.user.isLoggedIn = true
            if(payload[0]?.isDoctor){
               state.user.isHealthWorker = true;
               state.user.isNormalUser = false
            }
            else{
                state.user.isHealthWorker = false;
                state.user.isNormalUser = true
            }
            state.user.userInfo = payload
        },
        [confirmCode.rejected]:(state,{payload})=>{
            console.log(`The payload is ${payload}`)
            state.user.loadingOtp = false
            state.user.errorMessageOtp = payload
            


        },
        //confirm code

        //resend code
        [resendCode.pending]:(state)=>{
            state.user.loadingResendCode = true
            state.user.errorMessageOtp = null
        },
        [resendCode.fulfilled]:(state, {payload})=>{
            state.user.loadingResendCode = false
            state.user.resentCodeMessage = payload

        },
        [resendCode.rejected]:(state, {payload})=>{
            state.user.loadingResendCode = false
            state.user.errorResendCode = payload
    
            
        },
        //resend code

        //send email
         [sendEmail.pending]:(state)=>{
             state.user.emailFailure = null
             state.user.emailSuccess = null
         },
         [sendEmail.fulfilled]:(state,{payload})=>{
            state.user.emailSuccess = payload
         },
         [sendEmail.rejected]:(state,{payload})=>{
             state.user.emailFailure = payload
         },
        //send email

        //send otp
         [forgotPasswordOtp.pending]:(state)=>{
             state.user.forgotPassswordOtpFailure  = null
             state.user.forgotPassswordOtpSuccess = null
         },
         [forgotPasswordOtp.fulfilled]:(state,{payload})=>{
             state.user.forgotPassswordOtpSuccess = payload
         },
         [forgotPasswordOtp.rejected]:(state, {payload})=>{
             state.user.forgotPassswordOtpFailure = payload
         },
        //send otp

        //update password
        [updatePassword.pending]:(state)=>{
            state.user.updatePasswordFailure = null
            state.user.updatePasswordSuccess = null
        },
        [updatePassword.fulfilled]:(state,{payload})=>{
            state.user.updatePasswordSuccess = payload
        },
        [updatePassword.rejected]:(state,{payload})=>{
            state.user.updatePasswordFailure = payload
        }
        //update password


    }
})
export const {logOut, clearLoginErrror , clearRegisterError , clearOtpError, clearEmailDetails,
     clearForgotOtp , clearUpdatePassword, clearRegisterSucess} = authSlice.actions
export default authSlice.reducer