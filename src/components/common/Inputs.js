import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';


const Inputs = ({ value, onChangeText, placeholder, editable, moreStyle }) => {
    const { inputStyle } = styles;
    return (
            <TextInput 
                placeholder={placeholder}
                autoCorrect={false}
                editable={editable}
                style={[inputStyle, moreStyle]}
                value={value}
                onChangeText={onChangeText}
            />
    );
};


export { Inputs };
