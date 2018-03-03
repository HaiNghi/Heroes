import { StyleSheet } from 'react-native';

const UserNotificationStyles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingTop:5
    },
    notificationItem: {
        flex: 1,
        flexDirection: 'row',
    },
    notificationItemTitle: {
        marginVertical: 3,
        marginHorizontal: 8,
        fontSize: 16,
        fontWeight: 'bold'
    },
    notificationItemMessage: {
        marginBottom: 10,
        marginHorizontal: 8,
        fontSize: 14,
    },
    notificationItemTextContent: {
        flex: 4/5,
        flexDirection: 'column'
    },
    notificationItemIconContent: {
        flex: 1/5,
        width: 50,
        height: 50,
        resizeMode : 'contain',
        alignSelf: 'center'
    }
})

export { UserNotificationStyles };


