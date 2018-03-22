import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

const configure = () => {
    PushNotification.configure({
    onRegister: (token) => {
        //process token

        console.log('TOKEN:', token); 
    },
    onNotification: (notification) => {
            console.log('NOTIFICATION:', notification);
        // process the notification
        // required on iOS only
        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    popInitialNotification: true,
    requestPermissions: true,

    });
};

const localNotification = () => {
    PushNotification.localNotification({
        alertAction: 'ABCDE',
        title: 'Notification Title',
        message: 'Notification Message',
        playSound: true,
        soundName: 'default',
        userInfo: { id: 'abcd' }
    });
};
const localNotificationSchedule = () => {
    PushNotification.localNotificationSchedule({
        message: 'My Notification Message', // (required)
        date: new Date(Date.now() + (10 * 1000)), // in 60 secs
        userInfo: { id: 'abcd' }
    });
};   
const cancelLocalNotifications = (id) => {
    PushNotification.cancelLocalNotifications(id);
};   
export {
    configure,
    localNotification,
    localNotificationSchedule,
    cancelLocalNotifications
};
