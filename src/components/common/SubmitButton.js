import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const SubmitButton = ({ children, onPress }) => {
    return (
        <View style={styles.buttonStyle}>
             <TouchableOpacity style={styles.buttonInnerStyle} onPress={onPress}>
                <Text style={styles.textStyle}>{ children }</Text>
           </TouchableOpacity>
        </View> 

    );
};

export { SubmitButton };

