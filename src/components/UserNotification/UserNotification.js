import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Container } from 'native-base';
import { HeaderForHome } from '../common/HeaderForHome';
import { SeparatingLine } from '../common/SeparatingLine';
import { UserNotificationStyles } from './UserNotificationStyles';
import NotificationData from './UserNotificationData';
import {getDeliveringStatusImageResourceURLByType, getTitleColorByType}  from './UserNotificationActions';

export default class UserNotification extends Component {

    render() {
        return (
            <Container>
                <HeaderForHome headerText="Your Notifications" navigation= { this.props.navigation } />
                <View style={UserNotificationStyles.listContainer}>
                    <FlatList
                        data = {NotificationData}
                        renderItem = {({item}) => 
                            <View>
                                {console.log(getDeliveringStatusImageResourceURLByType(item.type))}
                                <View style = {UserNotificationStyles.notificationItem}>
                                    <Image source={getDeliveringStatusImageResourceURLByType(item.type)}
                                    style = {UserNotificationStyles.notificationItemIconContent} />
                                    <View style={UserNotificationStyles.notificationItemTextContent}>
                                        <Text style={[UserNotificationStyles.notificationItemTitle, getTitleColorByType(item.type)]}>
                                            {item.title}
                                        </Text>
                                        <Text style={UserNotificationStyles.notificationItemMessage}>
                                            {item.message}
                                        </Text>
                                    </View>

                                </View>
                                <SeparatingLine lineWidth={1} lineColor = {'black'}/>
                            </View>
                        }
                    />
                </View>
            </Container>
        )
    }
}




