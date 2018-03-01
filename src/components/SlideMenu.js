import React, { Component } from 'react';
import { Alert, View, Text, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Content } from 'native-base';
import styles from './styles';
import route from '../routes/route';
import { NavigationActions } from 'react-navigation';

class SlideMenu extends Component {
    navigateToScreen = (route) => () => {
        this.props.navigation.navigate(route);
    }

    render() {
        return (
            <Container>
                <Header style={{ height: 200 }}>
                    <Body>
                        <Image
                            source={require('./image/user.png')}
                            
                        />
                        <Text style={styles.textStyle}>Nickie</Text>
                    </Body>
                </Header>
                <Content>
                    <TouchableOpacity style={styles.drawerItemStyle}>
                        <Image 
                            source={require('./image/settings.png')}
                            style={styles.imageIconStyle}
                        />
                        <Text style={styles.drawerItemText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerItemStyle}>
                        <Image 
                            source={require('./image/history.png')}
                            style={styles.imageIconStyle}
                        />
                        <Text style={styles.drawerItemText}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerItemStyle}  onPress = { this.navigateToScreen('UserNotification') }>
                        <Image 
                            source={require('./image/notification.png')}
                            style={styles.imageIconStyle}
                        />
                        <Text style={styles.drawerItemText} >Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerItemStyle}>
                        <Image 
                            source={require('./image/call-centre.png')}
                            style={styles.imageIconStyle}
                        />
                        <Text style={styles.drawerItemText}>Help Centre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.drawerItemStyle}>
                        <Image 
                            source={require('./image/phone-call.png')}
                            style={styles.imageIconStyle}
                        />
                        <Text style={styles.drawerItemText}>Emergency</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
           
        );
    }
}
export default SlideMenu;
