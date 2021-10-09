import { createSlice } from '@reduxjs/toolkit';
import {
    cancelDoctor,
    cancelLabRequest,
    clientCompleteRequest,
    clientCurrentRequest,
    clientHistory,
    clientLatestRequestStatus,
    completeLabRequest,
    getAllLabServives,
    getdoctor,
    onGoingLabRequest,
    requestLabatoryService,
    updateUserLocation,
    getRequestLabService
} from './actions';
import { userHelperConstants } from './constants';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        normaluser: {
            currentLocation: null,
            updatedLocation: null,
            updatedLocationErrorMessage: null,
            getDoctorErrorMessage: null,
            updatedLocationSuccessMessage: null,
            //getdoctor
            getDoctorInfo: null,
            noDoctorAvailable: null,
            tempHoldDoctorInfo: null,
            //getdoctor
            //cancelrequest
            cancelRequestedDoctor: null,
            cancelRequestedDoctorError: null,
            //cancelrequest

            //history
            historyInfo: null,
            noHistoryInfo: null,
            //history

            //reuest status
            latestRequestStatus: null,
            latestRequestStatusError: null,
            //request status

            //completeRequest
            completRequestInfo: null,
            completeRequestError: null,
            //completeRequest

            //healthworker role
            healthworkerRole: null,
            //healthworker role,

            //labservices
            labServices: null,
            requestedService: null,
        },
    },
    reducers: {
        updateLocation: (state, { payload }) => {
            state.normaluser.currentLocation = payload;
        },
        clearLoaction: (state) => {
            state.normaluser.currentLocation = null;
            state.normaluser.updateLocation = null;
            state.normaluser.updatedLocationErrorMessage = null;
            state.normaluser.updatedLocationSuccessMessage = null;
            //console.log(state.normaluser.getDoctorInfo)
        },
        clearDoctorInfo: (state) => {
            state.normaluser.getDoctorErrorMessage = null;
            state.normaluser.getDoctorInfo = null;
            state.normaluser.noDoctorAvailable = null;
        },
        clearCancelRequest: (state) => {
            state.cancelRequestedDoctor = null;
            state.cancelRequestedDoctorError = null;
        },
        clearCompleteRequestInfo: (state) => {
            state.normaluser.completRequestInfo = null;
        },
        setHealthWorkerRole: (state, { payload }) => {
            state.normaluser.healthworkerRole = payload;
        },
        clearRequestedLabService: (state) => {
            state.normaluser.requestedService = null;
        },
        setRequestedLabService: (state, { payload }) => {
            state.normaluser.requestedService = payload?.request;
        },
    },
    extraReducers: {
        //updatelocation
        [updateUserLocation.pending]: (state) => {
            state.normaluser.updatedLocationErrorMessage = null;
        },
        [updateUserLocation.fulfilled]: (state, { payload }) => {
            //console.log(`On success the payload ${payload}`)
            state.normaluser.updatedLocationSuccessMessage = payload;
        },
        [updateUserLocation.rejected]: (state, { payload }) => {
            console.log(`The error message is ${payload}`);
            state.normaluser.updatedLocationErrorMessage = payload;
        },

        //updatelocation

        //getdoctor
        [getdoctor.pending]: (state) => {
            state.normaluser.getDoctorErrorMessage = null;
        },
        [getdoctor.fulfilled]: (state, { payload }) => {
            console.log(`The payload ${JSON.stringify(payload)}`);
            if (payload == userHelperConstants.noDoctorAvailable) {
                state.normaluser.noDoctorAvailable =
                    'No doctor currently avaialable';
                state.normaluser.getDoctorInfo = null;
            } else {
                const doctor = payload?.doctor;
                // console.log(`The doctor ${JSON.stringify(doctor)}`);
                const request = payload?.request;
                state.normaluser.tempHoldDoctorInfo = doctor;
                const info = { doctor, request };
                state.normaluser.getDoctorInfo = info;
            }

            //console.log(`The data of the nearest doctor is  ${state.normaluser.getDoctorInfo}`)
        },
        [getdoctor.rejected]: (state, { payload }) => {
            //console.log(`On Failure the payload ${payload}`)
            state.normaluser.getDoctorErrorMessage = payload;
        },
        //getdoctor

        //cancelrequest
        [cancelDoctor.pending]: (state, { payload }) => { },
        [cancelDoctor.fulfilled]: (state, { payload }) => {
            state.normaluser.cancelRequestedDoctor = payload;
        },
        [cancelDoctor.rejected]: (state, { payload }) => {
            state.normaluser.cancelRequestedDoctorError = payload;
        },
        //cancelrequest

        //get doctor history
        [clientHistory.pending]: (state) => {
            state.normaluser.noHistoryInfo = null;
            state.normaluser.historyInfo = null;
        },
        [clientHistory.fulfilled]: (state, { payload }) => {
            // console.log(`The payload is ${JSON.stringify(payload?.data)}`)

            //modify data
            const requestArray = payload?.data?.request[0];
            //alert(JSON.stringify(requestArray.map(req=>req.status)))
            const doctorDetails = [];

            payload?.data?.doctor.map((array, index) =>
                array.map((obj) => {
                    doctorDetails.push({
                        ...obj,
                        requestStatus: requestArray[index].status,
                    });
                    return {
                        ...obj,
                        requestStatus: requestArray[index].status,
                    };
                })
            );

            //modify data
            state.normaluser.historyInfo = doctorDetails;
        },
        [clientHistory.rejected]: (state, { payload }) => {
            // console.log(`The payload is here`)
        },

        //get doctor history

        //check client request
        [clientLatestRequestStatus.pending]: (state) => { },
        [clientLatestRequestStatus.fulfilled]: (state, { payload }) => {
            //here
            const doctor = state.normaluser.tempHoldDoctorInfo;
            const request = payload?.data?.request[0];

            const info = { doctor, request };
            state.normaluser.getDoctorInfo = info;
            //here
        },
        [clientLatestRequestStatus.rejected]: (state, { payload }) => {
            //state.normaluser.latestRequestStatusError = payload
        },
        //check client request

        //completerequest
        [clientCompleteRequest.pending]: (state) => {
            state.normaluser.completRequestInfo = null;
            state.normaluser.completeRequestError = null;
        },
        [clientCompleteRequest.fulfilled]: (state, { payload }) => {
            //console.log(`The rated payload is ${JSON.stringify(payload)}`);

            //state.normaluser.completeRequestError = payload.message

            state.normaluser.completRequestInfo = payload;
        },
        [clientCompleteRequest.rejected]: (state, { payload }) => {
            state.normaluser.completeRequestError = payload;
        },
        //completrequest

        //labservices
        [getAllLabServives.pending]: (state) => {
            state.normaluser.labServices = null;
        },
        [getAllLabServives.fulfilled]: (state, { payload }) => {
            state.normaluser.labServices = payload;
        },
        [getAllLabServives.rejected]: (state, { payload }) => {
            //console.log('There is an error');
        },
        //labservices

        //requestedServie
        [requestLabatoryService.pending]: (state) => {
            //alert('pending')
            state.normaluser.requestedService = null;
        },
        [requestLabatoryService.fulfilled]: (state, { payload }) => {
            //alert('fulfilled')
            //alert(`The request service is ${JSON.stringify(payload)}`);
            state.normaluser.requestedService = payload?.request;
            //alert(`The request service is ${JSON.stringify(state.normaluser.requestedService)}`)

        },
        [requestLabatoryService.rejected]: (state, { payload }) => {
            //alert('rejected')
        },
        //requested lab service
        //getrequested lab service
        [getRequestLabService.pending]: (state) => {

        },
        [getRequestLabService.fulfilled]: (state, { payload }) => {
            state.normaluser.requestedService = payload?.request;
        },
        [getRequestLabService.rejected]: (state, { payload }) => {
            //console.log('reejected')
        },

        [requestLabatoryService.rejected]: (state, { payload }) => { },
        //requestService
        //cancelrequest
        [cancelLabRequest.pending]: (state) => { },
        [cancelLabRequest.fulfilled]: (state, { payload }) => {
            //alert('very ok')
            state.normaluser.requestLabService = null;
        },
        [cancelLabRequest.rejected]: (state, { payload }) => {
            // console.log('There is an error');
        },
        //cancelrequest
        //ongoinglabrequest
        [onGoingLabRequest.pending]: (state) => { },
        [onGoingLabRequest.fulfilled]: (state, { payload }) => {
            state.normaluser.requestedService = payload.request;
        },
        [onGoingLabRequest.rejected]: (state, { payload }) => { },
        //ongoinglabrequest
        //completelabrequest
        [completeLabRequest.pending]: (state) => { },
        [completeLabRequest.fulfilled]: (state, { payload }) => {
            //state.normaluser.requestedService = payload
        },
        [completeLabRequest.rejected]: (state, { payload }) => { },
        //completlabrequest

        //currentrequest
        [clientCurrentRequest.pending]: (state) => { },
        [clientCurrentRequest.fulfilled]: (state, { payload }) => {
            if (payload == userHelperConstants.noRequests) {
                //do nothing
            } else {
                const doctor = payload?.doctor[0];
                //console.log(`The current doctor is ${JSON.stringify(doctor)}`);
                //console.log(`The doctor ${JSON.stringify(doctor)}`)
                const request = payload?.request[0];
                state.normaluser.tempHoldDoctorInfo = doctor;
                const info = { doctor, request };
                state.normaluser.getDoctorInfo = info;
            }
        },
        [clientCurrentRequest.rejected]: (state, { payload }) => { },
        //currentrequest
    },
});
export const {
    updateLocation,
    clearLoaction,
    clearDoctorInfo,
    clearCancelRequest,
    clearCompleteRequestInfo,
    setHealthWorkerRole,
    clearRequestedLabService,
    setRequestedLabService
} = userSlice.actions;
export default userSlice.reducer;