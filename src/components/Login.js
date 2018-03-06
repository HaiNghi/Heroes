import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Container, Button, Text, Content, Item, Input, Body } from 'native-base';
import { LoginFormStyle } from './styles';
/* eslint-disable global-require */

class Login extends Component {
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
                                    <Input placeholder='Email' />
                                </Item>
                            </Body>
                            <View>
                            <Body style={LoginFormStyle.secondInputStyle}>
                                <Item rounded style={LoginFormStyle.inputBackGroundStyle}>
                                    <Input placeholder='Password' />
                                </Item>
                            </Body>
                            <Button 
                                full success 
                                style={LoginFormStyle.buttonStyle}
                                onPress={() => this.props.navigation.navigate('Home')}
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
                    </View>
            </Container>
               
               
        );
    }
}

export default Login;
