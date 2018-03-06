import React from 'react';
import { Container, Left, Right, Text, Thumbnail, Body, Icon } from 'native-base';
import styles from '../NotificationItem/NotificationItemStyle';
/* eslint-disable global-require */

const HelpCentreItem = () => {
    return (
        <Container style={styles.containerStyle}>
            <Left>
                <Thumbnail small size={15} source={require('../image/question.png')} />
            </Left>
            <Body style={styles.bodyStyle}>
                <Text>Shipper's service</Text>
            </Body>
            <Right>
                <Icon name="ios-arrow-forward-outline" />
            </Right>
        </Container>
                
    );
};
export default HelpCentreItem;
