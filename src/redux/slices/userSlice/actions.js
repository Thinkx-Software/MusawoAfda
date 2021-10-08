
import axiosInstance from '../../axios/axios';
import { userConstants, userHelperConstants } from './constants';
import { userRequests } from './requests';
import { createAsyncThunk } from '@reduxjs/toolkit';

import getUserPushToken from '../../../services/getUserPushToken';

export const updateUserLocation = createAsyncThunk(
    userConstants.UPDATELOCATION,
    async ({ id, userDetails }, { rejectWithValue }) => {
        try {
            //console.log(`The details information is ${JSON.stringify(userDetails)}`)
            const { data } = await axiosInstance.post(
                `${userRequests.updatelocation}/${id}`,
                userDetails
            );
            // console.log(`The data is ${JSON.stringify(data)}`)
            return data.message;
        } catch (error) {
            console.log(error.message);
            if (error.response.status) {
                console.log(
                    `The error info is ${JSON.stringify(
                        error.response.data.errors
                    )}`
                );

                return rejectWithValue(`${errors}`);
            }
            //response
            return rejectWithValue(` Error`);
        }
    }
);

//get doctor
export const getdoctor = createAsyncThunk(
    userConstants.GETDOCTOR,
    async (id, { rejectWithValue }) => {
        // alert(id);
        try {
            const { data } = await axiosInstance.get(`/getDoctor/${id}`);
            // console.log(`The data is ${JSON.stringify(data)}`);
            if (data?.data) {
                // getUserPushToken(
                //     data?.data?.doctor?.id,
                //     `Hello ${data?.data?.doctor?.name}`,
                //     'You have a new patient request'
                // );
                return data?.data;
            } else {
                return userHelperConstants.noDoctorAvailable;
            }
        } catch (error) {
            console.log(`The error message is ${error}`);
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);
//get doctor

//cancel client
export const cancelDoctor = createAsyncThunk(
    userConstants.CANCELREQUEST,
    async (ids, { rejectWithValue }) => {
        //alert(id)
        const { requestId, doctor } = ids;
        try {
            const { data } = await axiosInstance.post(
                `/cancelClient/${requestId}`
            );
            //console.log(`The data is ${JSON.stringify(data)}`)

            // Notify doctor of canceled request
            // getUserPushToken(
            //     doctor?.id,
            //     `Hello ${doctor?.name}`,
            //     'The request has been canceled'
            // );
            return data.message;
        } catch (error) {
            console.log(`The error message is ${error.message}`);
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);
//cancel client

//history
export const clientHistory = createAsyncThunk(
    userConstants.HISTORY,
    async (id, { rejectWithValue }) => {
        //alert(id)
        try {
            const { data } = await axiosInstance.post(`/clientHistory/${id}`);
            //console.log(`The data is ${JSON.stringify(data)}`)

            return data;
        } catch (error) {
            // console.log(`The error message is ${error.message}`)
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);
//history

//client status
export const clientLatestRequestStatus = createAsyncThunk(
    userConstants.CLIENTSTATUS,
    async (id, { rejectWithValue }) => {
        //alert(id)
        try {
            const { data } = await axiosInstance.post(`/currentRequest/${id}`);
            //console.log(`The data is ${JSON.stringify(data)}`)

            return data;
        } catch (error) {
            //alert(`The error message is ${error.message}`)
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);

//client status

//complete request
export const clientCompleteRequest = createAsyncThunk(
    userConstants.COMPLETEREQUEST,
    async ({ id, client_review, rating }, { rejectWithValue }) => {
        //console.log(`The rating and review ${JSON.stringify(userDetails)}`)
        try {
            const { data } = await axiosInstance.post(`/completeClient/${id}`, {
                client_review,
                rating: rating.toString(),
            });
            //console.log(`The rated info ${JSON.stringify(data)}`)

            return data;
        } catch (error) {
            //alert(`The error message is ${error.message}`)
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);

//complete request

//get lab services
export const getAllLabServives = createAsyncThunk(
    userConstants.LABSERVICES,
    async (_, { rejectWithValue }) => {
        //console.log(`The rating and review ${JSON.stringify(userDetails)}`)
        try {
            const { data } = await axiosInstance.post(`/allServices`);
            //console.log(`The rated info ${JSON.stringify(data)}`)

            return data?.data;
        } catch (error) {
            //alert(`The error message is ${error.message}`)
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);

//get lab services

//request lab service
export const requestLabatoryService = createAsyncThunk(
    userConstants.REQUESTLABSERVICE,
    async ({ id, userDetails, dispatch }, { rejectWithValue }) => {
        //alert(JSON.stringify(userDetails))
        //console.log(`The rating and review ${JSON.stringify(userDetails)}`)
        try {
            const { data } = await axiosInstance.post(`/requestService/${id}`, userDetails);
            //alert(`The lab request is ${JSON.stringify(data)}`);

            return data?.data;
        } catch (error) {
            //alert(`The error message is ${error.message}`)
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);
//request lab service

//client current request
export const clientCurrentRequest = createAsyncThunk(
    userConstants.CURRENTREQUEST,
    async (id, { rejectWithValue }) => {
        //console.log(`The rating and review ${JSON.stringify(userDetails)}`)
        //alert('here')
        try {
            const { data } = await axiosInstance.post(`/currentRequest/${id}`);
            // console.log(`The current request is ${JSON.stringify(data)}`);
            if (data.message) {
                return userHelperConstants.noRequests;
            } else {
                return data?.data;
            }
        } catch (error) {
            //alert(`The error message is ${error.message}`)
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);

//client current request

//cancel lab request
export const cancelLabRequest = createAsyncThunk(
    userConstants.CANCELLABREQUESTT,
    async (id, { rejectWithValue }) => {
        //console.log(`The rating and review ${JSON.stringify(userDetails)}`)
        //alert('here')
        try {
            const { data } = await axiosInstance.post(
                `/cancelLabRequest/${id}`
            );
            console.log(`The current request is ${JSON.stringify(data)}`);
            if (data.message) {
                return data?.message;
            }
        } catch (error) {
            //alert(`The error message is ${error.message}`)
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);
//cancel lab request

//ongoing lab request
export const onGoingLabRequest = createAsyncThunk(
    userConstants.ONGOINGREQUEST,
    async (id, { rejectWithValue }) => {

        try {
            //alert(id);
            const { data } = await axiosInstance.post(
                `/currentLabRequest/${id}`
            );
            console.log(`The current request is ${JSON.stringify(data)}`)


            return data?.data;
        } catch (error) {
            //alert(`The error message is ${error.message}`)
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);
//ongoing lab request

//complete lab request
export const completeLabRequest = createAsyncThunk(
    userConstants.REQUESTLABSERVICE,
    async ({ id, userDetails }, { rejectWithValue }) => {
        //console.log(`The rating and review ${JSON.stringify(userDetails)}`)
        try {
            const { data } = await axiosInstance.post(
                `/rateLabRequest/${id}`,
                userDetails
            );
            console.log(`The rated lab request ${JSON.stringify(data)}`);

            return data?.data;
        } catch (error) {
            //alert(`The error message is ${error.message}`)
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);

//complete lab request

//request lab service
export const getRequestLabService = createAsyncThunk("DOCTORS/GETREQUESTEDLABSERVICE",
    async ({ id, userDetails }, { rejectWithValue }) => {
        // alert(id);
        try {
            const { data } = await axiosInstance.post(`/requestService/${id}`, userDetails);
            console.log(`The data is ${JSON.stringify(data)}`);
            if (data?.data) {

                return data?.data;
            } else {
                return userHelperConstants.noDoctorAvailable;
            }
        } catch (error) {
            console.log(`The error message is ${error}`);
            if (error.response.status) {
                return rejectWithValue(`There is an error`);
            }
            //response
            return rejectWithValue(`error message`);
        }
    }
);
//request lab service