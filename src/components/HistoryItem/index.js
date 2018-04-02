import React from 'react';
import { Image } from 'react-native';
import { Container, Left, Right, Button, Text, Content, View } from 'native-base';
import styles from './HistoryItemStyle';
/* eslint-disable global-require */

const HistoryItem = ({ status, date, pickUpLocationAddress, destinationAddress }) => {
    let specificStatus;
    switch (status) {
        case 1: { specificStatus = 'Waiting'; break; }
        case 2: { specificStatus = 'Picked up'; break; }
        case 3: { specificStatus = 'Delivering'; break; }
        case 4: { specificStatus = 'Complete'; break; }
        default: break;
    }
    return (
        <Container style={styles.containerStyle}>
            <Content>
                <View style={styles.statusStyle}>
                    <Left>
                        <Button small primary disabled><Text>{specificStatus}</Text></Button>
                    </Left>
                    <Right>
                        <Text style={{ fontSize: 10, fontWeight: 'bold' }}>{date}</Text>
                    </Right>
                </View>
                <View style={styles.locationViewStyle} >
                    <Image 
                        source={require('../image/placeholder.png')}
                        style={styles.iconStyle}
                    />
                    <View style={{ flexWrap: 'wrap', flex: 1 }}>
                        <Text style={styles.addressStyle} >{pickUpLocationAddress}</Text>
                    </View>
                    
                </View>
                <View style={styles.locationViewStyle} >
                    <Image 
                        source={require('../image/destination.png')}
                        style={styles.iconStyle}
                    />
                    <View style={{ flexWrap: 'wrap', flex: 1 }}>
                        <Text style={styles.addressStyle} >{destinationAddress}</Text>
                    </View>
                </View>
            </Content>
        </Container>
    );
};
export default HistoryItem;
