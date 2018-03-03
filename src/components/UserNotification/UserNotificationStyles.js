import { StyleSheet } from 'react-native';

const UserNotificationStyles = StyleSheet.create({
    listContainer: {
        flex: 1,
        paddingTop:5
    },
    notificationItem: {
        flex: 1,
        flexDirection: 'row',
        height: 80,
        marginRight: 10
    },
    notificationItemTextContent: {
        flex: 4/5,
        flexDirection: 'column'
    },
    notificationItemTextContentTop: {
        marginVertical: 3,
        flexDirection: 'row',
    },
    notificationItemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 3/5
    },
    notificationItemTime: {
        flex: 2/5,
        fontSize: 13,
        alignSelf: 'center',
        textAlign: 'right',
    },
    notificationItemNavigateArrowIcon: {
        flex: 0,
        width: 10,
        height: 10,
        resizeMode : 'contain',
        alignSelf: 'center',
        marginRight: 10,
        
    },
    notificationItemIconContent: {
        flex: 1/5,
        width: '70%',
        height: '70%',
        resizeMode : 'contain',
        alignSelf: 'center'
    },
    notificationItemMessage: {
        marginBottom: 10,
        fontSize: 14,
    },
    
})

export { UserNotificationStyles };


