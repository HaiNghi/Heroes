import React from 'react';
import { Container, Left, Right, Text, Thumbnail, Body, Icon, View } from 'native-base';
import styles from './NotificationItemStyle';
import { 
    getTitleColorByType, 
    getDeliveringStatusImageResourceURLByType 
} from './NotificationActions';
/* eslint-disable global-require */


const NotificationItem = ({ item }) => {
    return (
        <Container style={styles.containerStyle}>
            <Left>
                <Thumbnail small size={15} source={getDeliveringStatusImageResourceURLByType(item.type)} />
            </Left>
            <Body style={styles.bodyStyle}>
                <Left style={{ flex: 2 }}>
                    <Text style={getTitleColorByType(item.type)}>{item.title}</Text>
                    <Text note>{item.message}</Text>
                </Left>
                
                <Right style={{ flex: 1 }}>
                    <Text note>{item.time}</Text>
                    <Icon name="ios-arrow-forward-outline" />
                </Right>
            </Body>
            
            
        </Container>
                
    );
};
export default NotificationItem;
