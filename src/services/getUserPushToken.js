// import { baseURL } from '../urls';
// import sendPushMsg from '../services/sendNotification';
// export default function getUserPushToken(id, title, message) {
//     const headers = new Headers();
//     headers.append('Accept', 'application/json');

//     fetch(`${baseURL}/retrieveToken/${id}`, { method: 'POST', headers })
//         .then((a) => a.json())
//         .then((result) => {
//             // console.log('User push token below...');
//             // console.log(result);
//             const token = result?.data?.push_token[0]?.push_token;
//             sendPushMsg(token, title, message);
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }
