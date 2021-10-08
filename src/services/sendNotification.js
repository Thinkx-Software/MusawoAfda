// export default function sendPushMsg(token, title, msg) {
//     console.log('param=>', token, msg);
//     fetch('https://exp.host/--/api/v2/push/send', {
//         method: 'POST',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             'accept-encoding': 'gzip, deflate',
//             host: 'exp.host',
//         },
//         body: JSON.stringify({
//             to: token,
//             title: title,
//             body: msg,
//             data: { msg: msg, title },
//             priority: 'high',
//             sound: 'default',
//             badge: '0',
//         }),
//     })
//         .then((response) => response.json())
//         .then((responseJson) => {
//             return responseJson;
//         })
//         .catch((error) => {
//             console.log(error);
//         });
// }
