import { StyleSheet } from 'react-native';

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    innerContainer: {
        alignItems: 'center',
        height: 205,
        backgroundColor: '#fff',
        opacity: 1
        
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
    imageStyle: { 
        width: 50, 
        height: 50, 
        marginTop: 15 
    }

};

export default styles;
