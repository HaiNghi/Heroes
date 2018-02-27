import React from 'react';
import { Header, Body, Title, Left, Button, Icon, Right} from 'native-base';
import styles from './styles';

const HeaderBase = ({ headerText, navigation }) => {
    const { goBack } = navigation;
    return (
        <Header style={{ backgroundColor: '#ff5e3a' }} iosBarStyle="light-content">
            <Left>
                <Button transparent onPress={() => goBack()}>
                    <Icon name="md-close" style={styles.icon} /> 
                </Button>
            </Left>
            <Body style={{ flex: 3 }}>
                {/* <Text style={styles.headerTextStyle}>{headerText}</Text> */}
                <Title style={styles.headerTextStyle}>{headerText}</Title>
            </Body>
            {/* <Right /> */}
            <Button transparent style={{ flex: 1 }} />
        </Header>
    );
};


export { HeaderBase };

