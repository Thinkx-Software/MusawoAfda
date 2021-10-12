import Axios from 'axios';
import { requestUserPermission } from './notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
//POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send

let headers = {
    "Content-Type": "application/json",
    "Authorization": "key=AIzaSyDA9DgljfNMn7bXEanSq6ZsgrlsfaicK1E"
}


export const sendNotification = async () => {
    //const message = 
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    //alert(`The token is ${fcmToken}`)
    const Message = {
        registration_ids: [`${fcmToken}`],
        notification: {
            title: "Check this Mobile (title)",
            body: "Rich Notification testing (body)",
        }
    }
    try {
        const { data } = await Axios.post('https://fcm.googleapis.com/v1/projects/thinkxcloud/messages:send', JSON.stringify(Message), headers);
        alert('sucess')

    } catch (error) {
        alert(JSON.stringify(error))
    }

}
