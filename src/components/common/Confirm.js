import React from 'react';
import { Text, View, Modal, Image } from 'react-native';
import { NormalButton } from '../common';

const Confirm = ({ children, visible, onAccept, onDecline }) => {
    const { containerStyle, textStyle } = styles;
    return (
        <View style={containerStyle}>
            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => {}}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.innerContainer}>
                        <Image 
                            source={require('.././image/checked-2.png')}
                            style={{ width: 50, height: 50 }}
                        />
                        <Text style={textStyle}>{children}</Text>
                        <View style={{ flexDirection: 'row', bottom: 1 }}>
                            <NormalButton onPress={onAccept}>Yes</NormalButton>
                            <NormalButton onPress={onDecline}>No</NormalButton>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
        
    );
};

const styles = {
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        justifyContent: 'center',
        lineHeight: 40,
        color: 'black',
        fontWeight: 'bold'
    },
    containerStyle: {
        flex: 2,
        justifyContent: 'center',
        flexDirection: 'column'
        
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#D8D8D8',
        alignItems: 'center',
        opacity: 0.8
      },
    innerContainer: {
        alignItems: 'center',
        height: 200,
        backgroundColor: '#fff',
        opacity: 1
        
    },
};

export { Confirm };
