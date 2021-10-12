import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import HealthWorkerFlatList from '../../components/FlatLists/HealthWorkerFlatList';
import HomeFlatList from '../../components/FlatLists/HomeFlatList';
import { constantstyles } from '../../constants/constanstStyles';
import {
    doctorHistory,
    getStatus,
    latestRequest,
} from '../../redux/slices/healthWorkerSlice/actions';
import { theme } from '../../theme';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
    clientCurrentRequest,
    clientHistory,
    clientLatestRequestStatus,
    onGoingLabRequest
} from '../../redux/slices/userSlice/actions';
import { FAB } from 'react-native-elements';
import { requestUserPermission } from '../../urls/notificationService';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';
import ButtonComponent from '../../components/Button/Button';
import { sendNotification } from '../../urls/sendNofication';


const Landing = () => {



    //get user
    const {
        user: { isNormalUser, isHealthWorker, userInfo },
    } = useSelector(({ authSlice }) => authSlice);

    const { healthWorker } = useSelector(
        ({ healthWorkerSlice }) => healthWorkerSlice
    );
    const {
        normaluser: { getDoctorInfo, healthworkerRole, requestedService },
    } = useSelector(({ userSlice }) => userSlice);

    //isfoccused
    const isFocussed = useIsFocused();
    const dispatch = useDispatch();
    const navigation = useNavigation();

    //dispatch history
    useEffect(() => {
        if (isHealthWorker) {
            //dis
            dispatch(doctorHistory(userInfo?.id));
            dispatch(getStatus(userInfo?.id));
        }
        if (isNormalUser) {
            dispatch(clientHistory(userInfo?.id));
            //client request
            dispatch(clientCurrentRequest(userInfo?.id));
            //client request
        }
        //request user permission
        requestUserPermission()
        //request user permission
        //send notification

    }, []);

    useEffect(() => {
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
            //navigation.navigate(remoteMessage.data.type);
            navigation.navigate('Home')
        });

        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(remoteMessage => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                    //setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
                }

            });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert(JSON.stringify(remoteMessage.notification.body));
        });

        return unsubscribe;
    }, [])
    //dispatch history

    useEffect(() => {
        dispatch(latestRequest(userInfo?.id));
        if (isNormalUser) {
            //client request
            dispatch(clientCurrentRequest(userInfo?.id));
            //client request
        }
    }, [isFocussed]);

    const onGoingRequest = () => {
        //check request
        dispatch(clientLatestRequestStatus(userInfo.id));
        navigation.navigate('NearestWorker', { role: healthworkerRole });

        //check request
    };

    //show request
    const labRequest = () => {
        //alert(requestedService?.id)
        dispatch(onGoingLabRequest(userInfo?.id))
        navigation.navigate('LabRequest')
    }
    //show request

    const sending = () => {
        sendNotification()
    }
    return (
        <View
            style={[
                constantstyles.container,
                { backgroundColor: theme.colors.secondary },
            ]}
        >
            <View>
                {isNormalUser ? (
                    <View>
                        {/*ongoing request */}

                        {getDoctorInfo !== null && (
                            <View
                                style={[
                                    constantstyles.absoluteStyles,
                                    {
                                        marginHorizontal: 20,
                                        bottom: -40,
                                        left: theme.dimensions.width / 5,
                                    },
                                ]}
                            >
                                <View

                                >


                                    <FAB title="OnGoingRequest"
                                        visible={true}
                                        color={theme.colors.primary}
                                        onPress={onGoingRequest}
                                        visible={getDoctorInfo != null}
                                        size="small"

                                    />
                                </View>
                            </View>
                        )}

                        {/*ongoing request */}

                        {/*ongoing lab request */}
                        <View>
                            <FAB title="View Lab Request"
                                visible={requestedService != null}
                                color={theme.colors.primary}
                                onPress={labRequest}



                            />
                        </View>
                        {/*ongoing lab request */}


                        <HomeFlatList />
                        {/* fake button*/}
                        <ButtonComponent mode="outlined" text="send" color={`${theme.colors.primary}`}
                            style={{
                                marginTop: 5,
                                borderRadius: 20,
                                borderWidth: 1,
                                borderColor: theme.colors.disabled,

                            }}
                            contentStyle={{
                                fontSize: 8, height: 28
                            }}
                            onPress={sending}
                        />
                        {/*fake button */}
                    </View>
                ) : (
                    <View>
                        {healthWorker?.latestRequestInfo == null ? (
                            <View
                                style={[
                                    constantstyles.elevatedCard,
                                    constantstyles.centerContent,
                                    { marginHorizontal: 10, marginTop: 10 },
                                ]}
                            >
                                <Text
                                    style={{
                                        color: theme.colors.primary,
                                        fontSize: 17,
                                    }}
                                >
                                    No Current Requests Available
                                </Text>
                            </View>
                        ) : (
                            <HealthWorkerFlatList
                                request={healthWorker?.latestRequestInfo}
                            />
                        )}
                    </View>
                )}
            </View>
        </View>
    );
};

export default Landing;

// const styles = StyleSheet.create({
//     contentView: {
//         marginHorizontal: 4,
//         marginVertical: 4,
//     },
//     cardStyles: {
//         backgroundColor: theme.colors.text,
//         elevation: 4,
//         padding: 5,
//         marginVertical: 10,
//         marginHorizontal: 10,
//         borderRadius: 10,
//     },
//     textStyle: {
//         color: theme.colors.primary,
//         fontSize: 18,
//     },
// });
