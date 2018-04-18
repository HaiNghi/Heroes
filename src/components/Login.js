import React, { Component } from 'react';
import { View, Image, Alert } from 'react-native';
import { Container, Button, Text, Content, Item, Input, Body } from 'native-base';
import Modal from 'react-native-modal';
import { LoginFormStyle } from './styles';
import { Spinner } from './common';
/* eslint-disable global-require */

class Login extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.success !== this.props.success) {
            this.props.navigation.navigate('Home');
        }
    }
    validateEmail = (text) => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text)) {
            return true;
        }
        return false;
    }
    login = () => {
        const { email, password } = this.props;
        
        if (email === '') {
            Alert.alert('Please input email !');
        } else {
            if (!this.validateEmail(email)) { 
                Alert.alert('Invalid email');
            } else {
                if (password === '') { 
                    Alert.alert('Please input password !');
                }
            }
        }
        if (email !== '' && password !== '' && this.validateEmail(email)) {
            // this.setState({ loading: true });
            this.props.loadSpinner();
            this.props.login(email, password);
        }
    }
    render() {
        return (
            <Container>
                <Image 
                    source={require('./image/background2.png')} 
                    style={{    
                            flex: 1,
                            width: '100%', 
                            height: '100%',
                            position: 'absolute',
                            }}
                />
                <View style={LoginFormStyle.headerStyle}>
                    <View style={LoginFormStyle.innerStyle}>
                        <Image 
                            source={require('./image/package.png')} 
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={LoginFormStyle.headerTextStyle}>Heroes</Text>
                            <Text note>Your delivery in one click</Text>
                        </View>
                      
                    </View>
                    <View style={LoginFormStyle.secondBodyStyle}>
                        <Text style={LoginFormStyle.textStyle}>HEROES comes to you to recover and deliver your package</Text>
                    </View>
                        <Content>
                            <Body style={{ margin: 20 }}>
                                <Item rounded style={LoginFormStyle.inputBackGroundStyle}>
                                    <Input 
                                        placeholder='Email' 
                                        onChangeText={(text) => this.props.inputEmail(text)}
                                        value={this.props.email}
                                    />
                                </Item>
                            </Body>
                            <View>
                            <Body style={LoginFormStyle.secondInputStyle}>
                                <Item rounded style={LoginFormStyle.inputBackGroundStyle}>
                                    <Input 
                                        secureTextEntry
                                        placeholder='Password' 
                                        onChangeText={(text) => this.props.inputPassword(text)}
                                        value={this.props.password}
                                    />
                                </Item>
                            </Body>
                            <Button 
                                full success 
                                style={LoginFormStyle.buttonStyle}
                                /* onPress={() => this.props.navigation.navigate('Home')}  */
                                onPress={() => this.login()} 
                            >
                                <Text>SIGN IN </Text>
                            </Button>
                            <Button 
                                full 
                                style={[LoginFormStyle.buttonStyle, { marginTop: 0, backgroundColor: '#FFE8D2' }]}
                                onPress={() => this.props.navigation.navigate('Register')}
                            >
                                <Text style={{ color: 'black' }}>SIGN UP </Text>
                            </Button>
                            <Button full transparent>
                                <Text style={{ color: '#fff' }}>Forgot your password</Text>
                            </Button>
                            </View>
                        </Content>

                        <Modal isVisible={this.props.loading}>
                            <Spinner />
                        </Modal>
                        <Modal isVisible={this.props.showModal}>
                            <View style={{ margin: 20, backgroundColor: '#fff', flexWrap: 'wrap', borderRadius: 20 }}>
                                <View>
                                    <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20, margin: 15}}>Login Failed!</Text>
                                    <Text note style={{textAlign: 'center', color: '#000', margin: 15, marginTop: 0 }}>Unable to login, either email nor password is uncorrect.</Text>
                                </View>
                            <View style={{borderWidth: 0.4, borderColor: "#000"}}></View>
                            <Button transparent full onPress={() => this.props.disableModal()}><Text>OK</Text></Button>
                            </View>
                        </Modal>
                    </View>
            </Container>
               
               
        );
    }
}
export default Login;
