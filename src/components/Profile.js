import React, { Component } from 'react';
import { Image, View } from 'react-native';
import { Container } from 'native-base';
import { HeaderBase } from './common';
/* eslint-disable global-require */

class Profile extends Component {
  
    render() {
        return (
            <Container>
                <View>
                    <HeaderBase headerText='Profile' />
                    <Image 
                        source={require('./image/view.png')} 
                        style={{    
                                flex: 1,
                                position: 'absolute' }}
                    />
                </View>
            </Container>
        );
    }
}
export default Profile;
