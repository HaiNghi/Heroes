
const styles = {
    containerStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 130,
        borderBottomWidth: 0.6,
        borderTopWidth: 0.6,
        borderColor: '#B0ACAB',
        padding: 10,
        flexWrap: 'wrap'
    },
    statusStyle: { 
        flex: 1, 
        flexDirection: 'row', 
        borderBottomWidth: 0.3, 
        paddingBottom: 5 
    },
    locationViewStyle: {
        flex: 1, 
        flexDirection: 'row',
        marginTop: 10, 
        alignItems: 'center',
    },
    iconStyle: { 
        height: 16, 
        width: 16 
    },
    addressStyle: {
        fontSize: 14, 
        marginLeft: 15, 
        color: '#555454' 
    },
    labelStyle: { 
        color: '#ff5e3a', 
        marginLeft: 10, 
        fontWeight: 'bold' 
    },
    textStyle: {
        fontSize: 14, 
        marginLeft: 0, 
        color: '#555454',
        marginBottom: 10,
        flexWrap: 'wrap'
    },
    //Modal
    innerContainer: {
        alignItems: 'center',
        height: 220,
        backgroundColor: '#fff',
        opacity: 1,
        borderRadius: 7
        
    },
    imageStyle: {
        width: 50, 
        height: 50, 
        marginTop: 15
    },
    modalText: {
        fontSize: 17,
        textAlign: 'center',
        justifyContent: 'center',
        lineHeight: 30,
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 15
    }
};
export default styles;
