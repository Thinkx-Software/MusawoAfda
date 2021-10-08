import { createSlice } from "@reduxjs/toolkit";
import {
    acceptRequest, activateHealthWorker, cancelRequest, completeRequest, deactivateHealthWorker,
    doctorHistory, getStatus, latestRequest, updateHealthWorkerLocation
} from "./actions";

const healthWorkerSlice = createSlice({
    name: "healthWorker",
    initialState: {
        healthWorker: {
            //activate info
            activatedHealthWorkerInfo: true,
            switchLoader: false,
            //activate info?
            currentLocation: null,
            updatedLocation: null,
            updatedLocationErrorMessage: null,
            updatedLocationSuccessMessage: null,
            //latest
            latestRequestInfo: null,
            latestRequestError: null,
            latestRequestMessage: null,
            tempClientRequest: null,
            //latest
            //accept
            acceptRequestInfo: null,
            acceptRequestError: null,
            //accept
            cancelRequestInfo: null,
            cancelRequestError: null,
            //history
            healthWorkHistory: null,
            //history

            //completerequest
            completeRequest: null,
            completeRequestError: null,
            //completerequest



        }
    },
    reducers: {

        updateHealthWorker: (state, { payload }) => {
            state.healthWorker.currentLocation = payload
        },
        clearHealthWorkLocation: (state) => {
            state.healthWorker.currentLocation = null
            state.healthWorker.updatedLocation = null
            state.healthWorker.updatedLocationErrorMessage = null
            state.healthWorker.updatedLocationSuccessMessage = null

        },
        setSwitchLoader: (state) => {
            state.healthWorker.switchLoader = true
        }
    },
    extraReducers: {
        //update location
        [updateHealthWorkerLocation.pending]: (state) => {
            state.updatedLocation = null
            state.updatedLocationSuccessMessage = null
            state.updatedLocationSuccessMessage = null

        },
        [updateHealthWorkerLocation.fulfilled]: (state, { payload }) => {
            console.log(`The payload is ${payload}`)
            state.healthWorker.updatedLocationSuccessMessage = payload
        },
        [updateHealthWorkerLocation.rejected]: (state, { payload }) => {
            console.log(`The payload is ${payload}`)
            state.healthWorker.updatedLocationErrorMessage = payload
        },

        //update location

        //latest request
        [latestRequest.pending]: (state) => {
            state.healthWorker.latestRequestError = null
            state.healthWorker.latestRequestInfo = null
            state.healthWorker.latestRequestMessage = null
        },
        [latestRequest.fulfilled]: (state, { payload }) => {
            //console.log(`The latest request info ${JSON.stringify(payload)}`)
            if (payload.data) {
                const request = payload.data.request;
                const client = payload.data.client[0];
                state.healthWorker.tempClientRequest = client
                const requestInfo = { request, client }
                //console.log(`The request is ${JSON.stringify(requestInfo)}`)
                state.healthWorker.latestRequestInfo = [requestInfo]
            }
            else {
                state.latestRequestMessage = payload.message
            }

        },
        [latestRequest.rejected]: (state, { payload }) => {
            state.healthWorker.latestRequestError = payload
        },

        //lastest request

        //cancelRequest
        [cancelRequest.pending]: (state) => {
            state.healthWorker.acceptRequestError = null
            state.healthWorker.acceptRequestInfo = null
        },

        [cancelRequest.fulfilled]: (state, { payload }) => {
            state.healthWorker.cancelRequestInfo = payload
            state.healthWorker.latestRequestInfo = null
            state.healthWorker.acceptRequestInfo = null
        },
        [cancelRequest.rejected]: (state, { payload }) => {
            state.healthWorker.cancelRequestError = payload
        },
        //cancelRequest
        //acceptRequest
        [acceptRequest.pending]: (state) => { },
        [acceptRequest.fulfilled]: (state, { payload }) => {
            //console.log(`The request status is ${JSON.stringify(payload.data.request)}`)

            const request = payload.data.request
            state.healthWorker.acceptRequestInfo = request
            const client = state.healthWorker.tempClientRequest
            const requestInfo = { request, client }
            //console.log(`The request is ${JSON.stringify(requestInfo)}`)
            state.healthWorker.latestRequestInfo = [requestInfo]
        },
        [acceptRequest.rejected]: (state, { payload }) => {
            state.healthWorker.acceptRequestError = payload
        },
        //acceptRequest

        //doctor history
        [doctorHistory.pending]: (state) => { },
        [doctorHistory.fulfilled]: (state, { payload }) => {
            //console.log(`The payload payload ${JSON.stringify(payload?.data.request)}`)
            const results = [];
            const requestArray = payload?.data?.request[0];

            payload?.data?.client.map((array, index) => array.map(obj => {
                results.push({ ...obj, requestStatus: requestArray[index].status })
                return { ...obj, requestStatus: requestArray[index].status }
            }))
            state.healthWorker.healthWorkHistory = results
        },
        [doctorHistory.rejected]: (state, { payload }) => { },
        //doctor history

        //completerequest
        [completeRequest.pending]: (state, { payload }) => {
            state.healthWorker.completeRequest = null
            state.healthWorker.completeRequestError = null
        },
        [completeRequest.fulfilled]: (state, { payload }) => {
         
            const request = payload.data.request
            const client = state.healthWorker.tempClientRequest
            const requestInfo = { request, client }
            //console.log(`The request is ${JSON.stringify(requestInfo)}`)
            state.healthWorker.latestRequestInfo = [requestInfo]
            state.healthWorker.completeRequest = payload

        },
        [completeRequest.rejected]: (state, { payload }) => {
            state.healthWorker.completeRequestError = payload

        },
        //completerequest
        //activate worker
        [activateHealthWorker.pending]: (state) => { },
        [activateHealthWorker.fulfilled]: (state, { payload }) => {
            state.healthWorker.activatedHealthWorkerInfo = true
            state.healthWorker.switchLoader = false


        },
        [activateHealthWorker.rejected]: (state, { payload }) => { },
        //activate worker
        //deactivate worker
        [deactivateHealthWorker.pending]: (state) => { },
        [deactivateHealthWorker.fulfilled]: (state, { payload }) => {
            state.healthWorker.activatedHealthWorkerInfo = false
            state.healthWorker.switchLoader = false

        },
        [deactivateHealthWorker.rejected]: (state, { payload }) => {

        },
        //deactivate worker
        //getStatus
        [getStatus.pending]: (state) => {
        },
        [getStatus.fulfilled]: (state, { payload }) => {

            if (payload.data.status == 'inactive') {
                state.healthWorker.activatedHealthWorkerInfo = false

            }
            else {
                state.healthWorker.activatedHealthWorkerInfo = true
            }
        },
        [getStatus.rejected]: (state, { payload }) => {

        }
        //getStatus
    },

})

export const { updateHealthWorker, clearHealthWorkLocation, setSwitchLoader } = healthWorkerSlice.actions
export default healthWorkerSlice.reducer