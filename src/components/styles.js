import { StyleSheet } from 'react-native';

export const LoginFormStyle = StyleSheet.create({
    headerStyle: { 
        backgroundColor: '#ff5e3a', 
        opacity: 0.75, 
        flex: 1
    },
    innerStyle: { 
        flexDirection: 'row', 
        marginTop: 30, 
        justifyContent: 'center' 
    },
    headerTextStyle: { 
        fontSize: 30, 
        fontWeight: 'bold', 
        color: '#fff' 
    },
    secondBodyStyle: { 
        margin: 30, 
        justifyContent: 'center' 
    },
    textStyle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    inputBackGroundStyle: {
        backgroundColor: '#fff' 
    },
    secondInputStyle: { 
        marginLeft: 20, 
        marginRight: 20, 
        marginBottom: 20 
    },
    buttonStyle: {
        margin: 20, 
        backgroundColor: '#006600' 
    }
});

export const SlideMenuStyle = StyleSheet.create({
    imageIconStyle: {
        height: 25, 
        width: 25, 
        marginLeft: 20, 
        padding: 10 
    },
    drawerItemStyle: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        flex: 1,  
        paddingTop: 10, 
        paddingLeft: 10, 
        paddingRight: 10,
        marginTop: 10
    },
    drawerItemText: {
        marginLeft: 10, 
        flex: 1, 
        alignItems: 'center',  
        padding: 7, 
        alignSelf: 'center',
        fontSize: 15,
    },
    avatar: { 
        width: 90, 
        height: 90, 
        marginBottom: 10 
    },
    headerStyle: {
        height: 200, 
        backgroundColor: '#ECE8E7', 
        marginTop: 20 
    }
});

export const RegisterStyle = StyleSheet.create({
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 12,
        fontStyle: 'italic'
    },
});

export const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: '#E9E9E9' 
    },
    
    textStyle: {
        fontSize: 17,
        textAlign: 'center',
        justifyContent: 'center',
        lineHeight: 30,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15
    },
    //Modal
    innerContainer: {
        alignItems: 'center',
        height: 205,
        backgroundColor: '#fff',
        opacity: 1
        
    },
    imageStyle: {
        width: 50, 
        height: 50, 
        marginTop: 15
    }
});
export const PackageRegisterStyle = StyleSheet.create({
    inputWrapper: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 5,
        marginBottom: 0,
        backgroundColor: '#fff',
        opacity: 0.9,
        borderRadius: 7
    },
    priceWrapper: {
        bottom: 1, 
        position: 'absolute', 
        alignItems: 'center', 
        flexDirection: 'row', 
        flex: 1, 
        margin: 10,
        backgroundColor: '#ff5e3a', 
        borderRadius: 7, 
        shadowOpacity: 0.7, 
        shadowRadius: 7, 
        padding: 5
    },
    buttonWrapper: { 
        bottom: 1, 
        flex: 1, 
        alignItems: 'center', 
        position: 'relative', 
        marginTop: 30 
    },
    label: {
        fontSize: 16, 
        padding: 10, 
        color: '#323232', 
        fontWeight: 'bold',
        fontStyle: 'italic'
    },
    pickerText: {
        fontSize: 15, 
        paddingLeft: 10, 
        // fontWeight: 'bold',
        marginTop: 12,
    },
});
    
