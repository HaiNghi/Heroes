import React from 'react';
import { TextInput, View } from 'react-native';
import styles from './styles';

const Inputs = ({ value, onChangeText, placeholder, editable }) => {
    const { inputStyle } = styles;
    return (
            <TextInput 
                placeholder={placeholder}
                autoCorrect={false}
                editable={editable}
                style={[inputStyle]}
                value={value}
                onChangeText={onChangeText}
            />
    );
};


export { Inputs };
