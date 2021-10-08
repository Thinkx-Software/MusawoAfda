import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';
import { healthWorkerConstants } from './constants';
import { healthWorkerRequest } from './requests';

import getUserPushToken from '../../../services/getUserPushToken';

export const updateHealthWorkerLocation = createAsyncThunk(
    healthWorkerConstants.UPDATELOCATION,
    async ({ id, userDetails }, { rejectWithValue }) => {
        try {
            //alert(`Details ${JSON.stringify(id , userDetails)}`)
            const { data } = await axiosInstance.post(
                `${healthWorkerRequest.updatelocation}/${id}`,
                userDetails
            );

            return data.message;
        } catch (error) {
            console.log(`The error.message is ${error.message}`);
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

//latest request
export const latestRequest = createAsyncThunk(
    healthWorkerConstants.LATESTREQUEST,
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(
                `${healthWorkerRequest.latestrequest}/${id}`
            );
            //console.log(`The data is ${JSON.stringify(data)}`)
            return data;
        } catch (error) {
            //console.log(error.message)
            if (error.response.status) {
                //console.log(`The error info is ${JSON.stringify(error.response.data.errors)}`)

                return rejectWithValue(`${error.message}`);
            }
            //response
            return rejectWithValue(`There are no results`);
        }
    }
);

//latest request

//cancelRequest
export const cancelRequest = createAsyncThunk(
    healthWorkerConstants.CANCELREQUEST,
    async (item, { rejectWithValue }) => {
        try {
            // console.log(item?.client?.fname);
            const { data } = await axiosInstance.post(
                `${healthWorkerRequest.cancelrequest}/${item?.request?.id}`
            );
            // console.log(`The data is ${JSON.stringify(data)}`);

            // Notify user of canceled
            // getUserPushToken(
            //     item?.client?.id,
            //     `Hello ${item?.client?.fname}`,
            //     'You request has been canceled'
            // );

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
//cancel Request

//acceptRequest
export const acceptRequest = createAsyncThunk(
    healthWorkerConstants.ACCEPTREQUEST,
    async (item, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(
                `${healthWorkerRequest.acceptrequest}/${item?.request?.id}`
            );
            // console.log(`accepted request data is ${JSON.stringify(data)}`)

            // Notify user of accepted request
            // getUserPushToken(
            //     item?.client?.id,
            //     `Hello ${item?.client?.fname}`,
            //     'You request has been accepted'
            // );

            return data;
        } catch (error) {
            console.log(error.message);
            if (error.response.status) {
                // console.log(`The error info is ${JSON.stringify(error.response.data.errors)}`)

                return rejectWithValue(`${errors}`);
            }
            //response
            return rejectWithValue(` Error`);
        }
    }
);
//acceptRequest

//healthofficer history
export const doctorHistory = createAsyncThunk(
    healthWorkerConstants.DOCTORHISTORY,
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(`/doctorHistory/${id}`);
            //console.log(`accepted request data is ${JSON.stringify(data)}`)
            return data;
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
//healthofficer history

//complet request
export const completeRequest = createAsyncThunk(
    healthWorkerConstants.COMPLETEREQUEST,
    async (item, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(`/completeRequest/${item?.request?.id}`);
            //console.log(`accepted request data is ${JSON.stringify(data)}`)
            // Notify user of completed request
            // getUserPushToken(
            //     item?.client?.id,
            //     `Hello ${item?.client?.fname}`,
            //     'You request has been completed please confirm'
            // );
            return data;
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
            return rejectWithValue(` Erro in the request`);
        }
    }
);
//complet request

//active healthwork
export const activateHealthWorker = createAsyncThunk(
    healthWorkerConstants.ACTIVATEWORKER,
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(`/activate-doctor/${id}`);
            //console.log(`accepted request data is ${JSON.stringify(data)}`)
            return data;
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
            return rejectWithValue(` Erro in the request`);
        }
    }
);
//active healthworker

//deactivate healthworker
export const deactivateHealthWorker = createAsyncThunk(
    healthWorkerConstants.DEACTIVATEWORKER,
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axiosInstance.post(
                `/deactivate-doctor/${id}`
            );
            //console.log(`accepted request data is ${JSON.stringify(data)}`)
            return data;
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
            return rejectWithValue(` Erro in the request`);
        }
    }
);
//deaactivate healthworker
//status
export const getStatus = createAsyncThunk(
    healthWorkerConstants.GETSTATUS,
    async (id, { rejectWithValue }) => {
        //console.log(`The rating and review ${JSON.stringify(userDetails)}`)
        try {
            const { data } = await axiosInstance.post(`/doctor-status/${id}`);

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
//status
