import React from 'react';
import { Header, Body, Title, Left, Button, Icon, Right } from 'native-base';
import styles from './styles';

const HeaderForHome = ({ headerText, nodrawer, navigation }) =>{
    function drawerOpen() {
        if (!nodrawer) {
            navigation.navigate('DrawerOpen');
        } else { 
            console.log('No drawer');
        }
    }

    return (
        <Header style={{ backgroundColor: '#ff5e3a' }} iosBarStyle="light-content">
            <Left>
                <Button transparent onPress={() => drawerOpen()}>
                    <Icon name="ios-menu" style={styles.icon} /> 
                </Button>
            </Left>
            <Body>
                <Title style={styles.headerTextStyle}>{headerText}</Title>
            </Body>
            <Right>
                <Button transparent>
                    <Icon name="construct" style={styles.icon} /> 
                </Button>
            </Right>
        </Header>
    );
};

// const styles = {
//     icon: {
//         color: '#fff',
//         fontSize: 20
//     },
//     headerTextStyle: {
//         color: '#fff',
//         fontSize: 18

//     }
// };

export { HeaderForHome };

