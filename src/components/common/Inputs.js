import React from 'react';
import { TextInput } from 'react-native';
import styles from './styles';


const Inputs = ({ value, 
                onChangeText, 
                placeholder, 
                editable, 
                moreStyle, 
                keyboardType, 
                maxLength, 
                returnKeyType,
                minLength
             }) => {
    const { inputStyle } = styles;
    return (
            <TextInput 
                placeholder={placeholder}
                autoCorrect={false}
                editable={editable}
                style={[inputStyle, moreStyle]}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                maxLength={maxLength}
                returnKeyType={returnKeyType}
                minLength={minLength}
            />
    );
};


export { Inputs };
