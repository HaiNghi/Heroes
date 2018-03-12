import React from 'react';
import { Header, Body, Title, Left, Button, Icon, Right } from 'native-base';
import styles from './styles';

const HeaderBase = ({ headerText, navigation, left, right, onPress, previousPage }) => {
    const { goBack } = navigation;

    function onButtonPress() {
        const back = (previousPage == null);
        if (back) goBack(null); 
        else {
            console.log(previousPage);
            navigation.navigate(previousPage);
        }
    }
    return (
        <Header style={{ backgroundColor: '#ff5e3a' }} iosBarStyle="light-content">
            <Left>
                <Button transparent onPress={() => onButtonPress()}>
                    <Icon 
                        name={left ? 'ios-arrow-back-outline' : 'md-close'} 
                        style={styles.icon} 
                    /> 
                </Button>
            </Left>
            <Body style={{ flex: 3 }}>
                <Title style={styles.headerTextStyle}>{headerText}</Title>
            </Body>

            {
                right ? (
                    <Right>
                        <Button transparent onPress={onPress}>
                            <Icon name="ios-trash-outline" style={styles.icon} /> 
                        </Button>
                    </Right>
                ) : (
                    <Button transparent style={{ flex: 1 }} />
                )
                
            }
            
        </Header>
    );
};


export { HeaderBase };

