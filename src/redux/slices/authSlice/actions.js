import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";
import { authConstants, onLoginResults } from "./constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authRequests } from "./requests";

//register user
export const registerUser = createAsyncThunk(authConstants.REGISTER_USER, async (userInfo, { rejectWithValue }) => {
    try {
        const { data } = await axiosInstance.post(authRequests.regitser, userInfo)
        console.log(`The register data is ${JSON.stringify(data)}`)
        return data.message
    }
    catch (error) {
          
        if (error.response.status ) {
            const errors = []
            console.log(`The error info is ${JSON.stringify(error.response.data.errors)}`)
            for (const [key, value] of Object.entries(error.response.data.errors)) {
                //console.log(`${key}: ${value}`);
                errors.push(value)
              }
            return rejectWithValue(`${errors}`)
        }
        //response
        return rejectWithValue(` email or  name in use`)



    }
})
//register user

//login user
export const loginUser = createAsyncThunk(authConstants.LOGIN_USER,
    async (userInfo, { rejectWithValue }) => {

        try {
            const { data:{data:{user}} } = await axiosInstance.post(authRequests.login, userInfo)
             //console.log(`The data is ${JSON.stringify(user)}`)
            return user

        }
        catch (error) {            
            if (error.response.status ) {
                return rejectWithValue(`${onLoginResults.onLoginFail}`)
            }
            return rejectWithValue(`${onLoginResults.onLoginFail}`)
        }
    })
//login user

//otp
export const confirmCode = createAsyncThunk(authConstants.CONFIRMCODE,
    async (userInfo, { rejectWithValue }) => {

        try {
            const { data:{data:{user}} } = await axiosInstance.post(authRequests.confirm, userInfo)
             console.log(`The user data is ${JSON.stringify(user[0])}`)
            
            return user[0]

        }
        catch (error) {

            if (error.response.status ) {
                return rejectWithValue(`${onLoginResults.onCodeFail}`)
            }
            return rejectWithValue(`Invalide Code`)
        }
    })

//otp

//resend otp
export const resendCode = createAsyncThunk(authConstants.RESENDCODE,
    async (userInfo, { rejectWithValue }) => {

        try {
            const { data } = await axiosInstance.post(authRequests.resend, userInfo)
             console.log(`The user data is ${data}`)
            
            return data

        }
        catch (error) {

              console.log(`The error is ${error.message}`)
            return rejectWithValue(`${error.message}`)
        }
    })

//resend otp

//send email 
export const sendEmail = createAsyncThunk(authConstants.SENDEMAIL,
    async (username, { rejectWithValue }) => {
       //alert(username)
        try {
            const { data } = await axiosInstance.post(`/forgotPassword`, {username})
             if(data.message == 'No client found with this email'){
                return rejectWithValue(`Invalid username`)
             }
             else{
                return data
             }
            


        }
        catch (error) {

              console.log(`The error is ${error.message}`)
            return rejectWithValue(`${error.message}`)
        }
    })
//send email

//send otp for forgotpassword
export const forgotPasswordOtp = createAsyncThunk(authConstants.FORGOTPASSWORDOTP,
    async (otp, { rejectWithValue }) => {
        //alert(JSON.stringify(otp))

        try {
            const { data } = await axiosInstance.post(`/verifyOtp`, otp)
             console.log(`The user data is ${data}`)
            
            return data

        }
        catch (error) {

              console.log(`The error is ${error.message}`)
            return rejectWithValue(`${error.message}`)
        }
    })
//send otp for forgot password

//reset password
export const updatePassword = createAsyncThunk(authConstants.UPDATEPASSWORD,
    async ({userInfo, email}, { rejectWithValue }) => {
    console.log(`The email is ${JSON.stringify(email)} and info is ${JSON.stringify(userInfo)}`)
        try {
            const { data } = await axiosInstance.post(`/resetPassword/${email}`, userInfo)
             console.log(`The user data is ${data}`)
            
            return data

        }
        catch (error) {

              console.log(`The error is ${error.message}`)
            return rejectWithValue(`${error.message}`)
        }
    })
//reset password


