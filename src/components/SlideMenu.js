import React, { Component } from 'react';
import { View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Header, Body, Content, Footer, Button, Text, CheckBox } from 'native-base';
import Modal from 'react-native-modal';
import { Spinner } from './common';
import { SlideMenuStyle, styles } from './styles';
/* eslint-disable global-require */


class SlideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emergency: false, 
            user_info: [], 
            showConfirmModal: false,
            checked: false,
            showModalAgain: true
        };

        AsyncStorage.getItem('user_info', (error, result) => {
            this.setState({ user_info: JSON.parse(result) }, function () {
                AsyncStorage.getItem(`${this.state.user_info.user_id}`, (er, res) => {
                    if (res === 'OK') {
                        this.setState({ showModalAgain: false });
                    }
                });
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.logOutSuccess && this.props.logOutSuccess !== nextProps.logOutSuccess) {
            AsyncStorage.removeItem('user_info');
            this.props.navigation.navigate('Login');
        }
    }
    
    onCallEmergency() {
        this.props.navigation.navigate('DrawerClose');
        this.setState({ emergency: true });
    }

    onCheckBox = () => {
        this.setState({ checked: true });
        AsyncStorage.setItem(`${this.state.user_info.user_id}`, 'OK');
    }

    onCheckModal = () => {
        if (this.state.showModalAgain) {
            this.setState({ showConfirmModal: true });
        } else {
            this.props.loadingSpinner();
            this.props.logOut();
        }
    }

    navigatToScreen(route) {
        this.props.navigation.navigate(route);
    }

    logOut = () => {
        this.setState({ showConfirmModal: false });
        this.props.loadingSpinner();
        this.props.logOut();
    }

    render() {
        return (
            <Container>
                <Header style={SlideMenuStyle.headerStyle}>
                    <Body>
                        <Button transparent onPress={() => this.props.navigation.navigate('Profile')}>
                            <Image
                                source={require('./image/user.png')}
                                style={SlideMenuStyle.avatar}
                            />
                        </Button>
                       
                        <Text style={styles.textStyle}>{this.state.user_info.full_name}</Text>
                        {/* <Text style={[styles.textStyle, { fontSize: 19, marginTop: 25, marginBottom: 5 }]}>Nickie</Text> */}
                        <Text style={{ textAlign: 'center' }}>134 points | Reward member</Text>
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
                        <TouchableOpacity style={SlideMenuStyle.drawerItemStyle} onPress={() => this.onCheckModal()}>
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
                <Modal isVisible={this.props.loading}>
                    <Spinner />
                </Modal>
                <Modal isVisible={this.state.showConfirmModal} >
                        <View style={[styles.innerContainer, { borderRadius: 7, height: 150 }]}>
                            <Text style={[styles.textStyle, { fontSize: 20 }]}>Do you want to log out?</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <CheckBox checked={this.state.checked} style={{ marginRight: 20 }} onPress={() => this.onCheckBox()} />
                                <Text>Don't ask me again!</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Button success style={{ margin: 10, width: 100 }} onPress={() => this.logOut()} ><Text style={{ textAlign: 'center', marginLeft: 20 }}>OK</Text></Button>
                                <Button dark style={{ margin: 10 }} onPress={() => this.setState({ showConfirmModal: false })}><Text>DISMISS</Text></Button>
                            </View>
                            
                        </View>
                </Modal>
            </Container>
           
        );
    }
}
export default SlideMenu;
