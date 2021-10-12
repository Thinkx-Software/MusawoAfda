import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        getFCMToken()
        let token = '';
        try {
            token = await AsyncStorage.getItem('fcmToken');
            //alert(`The token is ${token}`)
            console.log(`The token is \n\n${token}\n`)
        } catch (error) {
            //alert('There is no token')
        }
        return token;
    }
}

//get token function
const getFCMToken = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    //checktoken
    if (!fcmToken) {

        try {
            const fcmToken = await messaging().getToken();
            //if token
            if (fcmToken) {
                //alert(fcmToken, "There is a token")
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
            //if token

        } catch (error) {
            console.log(error)
            //get a refresh token
            const fcmToken = await messaging().onTokenRefresh();
            if (fcmToken) {
                //alert(fcmToken, "There is a token")
                await AsyncStorage.setItem('fcmToken', fcmToken)
            }
        }
    }
    //checktoken
}

// //send notification
// export const sendNotification = () => messaging().onMessage(async remoteMessage => {
//     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
// });