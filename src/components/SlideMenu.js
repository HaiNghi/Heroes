import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Content, Footer, Button, Text } from 'native-base';
import Modal from 'react-native-modal';
import { SlideMenuStyle, styles } from './styles';
/* eslint-disable global-require */

class SlideMenu extends Component {
    state={ emergency: false };
    
    onCallEmergency() {
        this.props.navigation.navigate('DrawerClose');
        this.setState({ emergency: true });
    }
    navigatToScreen(route) {
        this.props.navigation.navigate(route);
    }

    render() {
        return (
            <Container>
                <Header style={{ height: 200, backgroundColor: '#ECE8E7' }}>
                    <Body>
                        <Image
                            source={require('./image/user.png')}
                        />
                        <Text style={styles.textStyle}>Nickie</Text>
                    </Body>
                </Header>
                <Content>
                    <TouchableOpacity style={SlideMenuStyle.drawerItemStyle} onPress={() => this.navigatToScreen('Home')}>
                        <Image 
                            source={require('./image/settings.png')}
                            style={SlideMenuStyle.imageIconStyle}
                        />
                        <Text style={SlideMenuStyle.drawerItemText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={SlideMenuStyle.drawerItemStyle} onPress={() => this.navigatToScreen('Histories')}>
                        <Image 
                            source={require('./image/history.png')}
                            style={SlideMenuStyle.imageIconStyle}
                        />
                        <Text style={SlideMenuStyle.drawerItemText}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={SlideMenuStyle.drawerItemStyle} onPress={() => this.navigatToScreen('Notifications')}>
                        <Image 
                            source={require('./image/notification.png')}
                            style={SlideMenuStyle.imageIconStyle}
                        />
                        <Text style={SlideMenuStyle.drawerItemText}>Notification</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={SlideMenuStyle.drawerItemStyle} onPress={() => this.navigatToScreen('HelpCentre')}>
                        <Image 
                            source={require('./image/call-centre.png')}
                            style={SlideMenuStyle.imageIconStyle}
                        />
                        <Text style={SlideMenuStyle.drawerItemText}>Help Centre</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={SlideMenuStyle.drawerItemStyle} onPress={() => this.onCallEmergency()} >
                        <Image 
                            source={require('./image/phone-call.png')}
                            style={SlideMenuStyle.imageIconStyle}
                        />
                        <Text style={SlideMenuStyle.drawerItemText}>Emergency</Text>
                    </TouchableOpacity>
                </Content>
                <Footer style={{ backgroundColor: '#ECE8E7', height: 60 }}>
                    <Body>
                        <TouchableOpacity style={SlideMenuStyle.drawerItemStyle}>
                            <Image 
                                source={require('./image/logout.png')}
                                style={{ padding: 9 }}
                            />
                            <Text style={{ padding: 9, fontSize: 16, fontWeight: 'bold' }}>Sign out</Text>
                        </TouchableOpacity>
                    </Body>
                   
                </Footer>
                <Modal isVisible={this.state.emergency} >
                        <View style={styles.innerContainer}>
                            <Text style={styles.textStyle}>You'll be making an emergency call to the Police Force</Text>
                            <Text note>Proceed only if you need immediate assistance</Text>
                            <Button full danger style={{ margin: 10 }}><Text>CALL POLICE NOW</Text></Button>
                            <Button transparent full onPress={() => this.setState({ emergency: false })}><Text>DISMISS</Text></Button>
                        </View>
                </Modal>
            </Container>
           
        );
    }
}
export default SlideMenu;
