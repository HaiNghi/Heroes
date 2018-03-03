import { StyleSheet } from 'react-native';

const UserNotificationStyles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingTop:5
    },
    notificationItem: {
        flex: 1,
        flexDirection: 'row',
        height: 80
    },
    notificationItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 3/5
    },
    notificationItemTime: {
        fontSize: 13,
        flex: 2/5,
        alignSelf: 'center',
    },
    notificationItemMessage: {
        marginBottom: 10,
        marginHorizontal: 8,
        fontSize: 14,
    },
    notificationItemTextContentTop: {
        marginVertical: 3,
        marginHorizontal: 8,
        flexDirection: 'row',
        justifyContent: 'space-between'
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


