import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

class SlideMenu extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.HeaderMenuStyle}>
                    <Image
                        source={require('./image/user.png')} 
                        style={{ marginTop: 20 }}
                    />
                    <Text>Nickie</Text>
                </View>
            </View>
        );
    }
}
export default SlideMenu;
