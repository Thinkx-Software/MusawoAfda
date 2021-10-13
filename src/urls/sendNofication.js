// import Axios from 'axios';
// import { requestUserPermission } from './notificationService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// //POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send

// let headers = {
//     "Content-Type": "application/json",
//     "Authorization": "key=AAAACN3C-Ms:APA91bENeG3NZmSPZWP-eRQh64u6rC7aru4nHpV-oUjwaJTDI4ZqMYxzX1osDrDnNObVAaWY_5cApqbIU4I-JYP4nO3ZSb3jPXrH5uY2kO6UA4PF4t9aTxjg-IXxkXTgyRrVzcQcrk5H"
// }


// export const sendNotification = async () => {
//     //const message = 
//     let fcmToken = await AsyncStorage.getItem('fcmToken');
//     //alert(`The token is ${fcmToken}`)
//     const Message = {
//         "to": `${fcmToken}`,
//         "data": {
//             "title": "Check this Mobile (title)",
//             "body": "Rich Notification testing (body)",
//         }
//     }
//     try {
//         const { data } = await Axios.post('https://fcm.googleapis.com/fcm/send', Message, headers);
//         alert('sucess')

//     } catch (error) {
//         alert(JSON.stringify(error))
//     }

// }
