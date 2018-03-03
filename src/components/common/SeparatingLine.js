import { View, StyleSheet, Container } from 'react-native';
import React from 'react';

const SeparatingLine = ({lineWidth, lineColor}) => {
    return (
        <View style={{
            borderBottomWidth: lineWidth,
            borderBottomColor: lineColor,
            }}>
        </View>
    )
}

export {SeparatingLine};