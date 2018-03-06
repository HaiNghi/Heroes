import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Button, Text, Content, Item, Input, Body } from 'native-base';
import { LoginFormStyle, RegisterStyle, styles } from './styles';
/* eslint-disable global-require */

class Register extends Component {
    navigateToScreen(route) {
        this.props.navigation.navigate(route);
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
                    <View>
                        <Text style={LoginFormStyle.textStyle}>SIGN UP</Text>
                    </View>
                    <Content>
                        <Body style={{ flex: 1, flexDirection: 'row', margin: 20 }}>
                            <Item rounded style={[LoginFormStyle.inputBackGroundStyle, { flex: 1 }]}>
                                <Input placeholder='First Name' />
                            </Item>
                            <Item rounded style={[LoginFormStyle.inputBackGroundStyle, { flex: 1 }]}>
                                <Input placeholder='Last Name' />
                            </Item>
                        </Body>
                        <Body style={LoginFormStyle.secondInputStyle}>
                            <Item rounded style={LoginFormStyle.inputBackGroundStyle}>
                                <Input placeholder='Email' />
                            </Item>
                        </Body>
                        <View>
                        <Body style={LoginFormStyle.secondInputStyle}>
                            <Item rounded style={LoginFormStyle.inputBackGroundStyle}>
                                <Input placeholder='Password' />
                            </Item>
                        </Body>
                        <Body style={LoginFormStyle.secondInputStyle}>
                            <Item rounded style={LoginFormStyle.inputBackGroundStyle}>
                                <Input placeholder='Confirm password' />
                            </Item>
                        </Body>
                        <Body style={LoginFormStyle.secondInputStyle}>
                            <Item rounded style={LoginFormStyle.inputBackGroundStyle}>
                                <Input placeholder='Address' />
                            </Item>
                        </Body>
                        <Button 
                            full success 
                            style={LoginFormStyle.buttonStyle}
                            onPress={() => this.navigateToScreen('Login')}
                        >
                            <Text>SIGN UP </Text>
                        </Button>
                        <Text style={RegisterStyle.textStyle}>
                                    We will not use your information for any purpose.
                                    By signing up, you agree terms of use
                        </Text>
                        <Button 
                            full transparent
                            onPress={() => this.navigateToScreen('Login')}
                        >
                            <Text style={{ color: '#fff' }}>SIGN IN</Text>
                        </Button>
                        </View>
                    </Content>
                    </View>
            </Container>
               
               
        );
    }
}

export default Register;
