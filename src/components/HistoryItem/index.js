import React from 'react';
import { Image } from 'react-native';
import { Container, Left, Right, Button, Text, Content, View } from 'native-base';
import styles from './HistoryItemStyle';
/* eslint-disable global-require */

const HistoryItem = () => {
    return (
        <Container style={styles.containerStyle}>
            <Content>
                <View style={styles.statusStyle}>
                    <Left>
                        <Button small primary disabled><Text>Canceled</Text></Button>
                    </Left>
                    <Right>
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Feb 22, 2018, 5:04 PM</Text>
                    </Right>
                </View>
                <View style={styles.locationViewStyle} >
                    <Image 
                        source={require('../image/placeholder.png')}
                        style={styles.iconStyle}
                    />
                    <Text style={styles.addressStyle} >K64/21 Ngoc Han</Text>
                </View>
                <View style={styles.locationViewStyle} >
                    <Image 
                        source={require('../image/destination.png')}
                        style={styles.iconStyle}
                    />
                    <Text style={styles.addressStyle} >K81 Ngo Thi Nham</Text>
                </View>
            </Content>
        </Container>
    );
};
export default HistoryItem;
