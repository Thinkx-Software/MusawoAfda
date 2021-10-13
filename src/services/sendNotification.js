// export default function sendPushMsg(token, title, msg) {
//     //console.log('param=>', token, msg);
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


export default async function sendPushMsg() {
    const message = {
        to: 'c2PcTyuLRrazTN0BJbsv-9:APA91bFca_WSEOrAeUN8ruxNZ2HgU0SCYwyLtqIvFpRiYuP5vO2yJRVMiT_yaGzV6xrgzykc68u00gcIa6NNH3rMjlYiF9K6aMXv7LjnAE9vn10ZJclBqf8ziIi2JlD4gPNidCG4vvYX',
        sound: 'default',
        title: 'Original Title',
        body: 'And here is the body!',
        data: { someData: 'goes here' },
    };
    alert('here')
    try {
        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });

    } catch (error) {
        alert(error.message)
    }

}
