import React, { Component } from 'react';
import { 
    Container, 
    List, 
    ListItem, 
    Content, 
    View,
    Button,
    Text
} from 'native-base';
import { HeaderBase, SubmitButton } from './common';
import HelpCentreItem from './HelpCentreItem';

class HelpCentre extends Component {
    render() {
        return (
            <Container>
                <HeaderBase 
                    headerText='Help Centre' 
                    navigation={this.props.navigation} 
                />
                <Content>
                    <View style={{ backgroundColor: '#fff', margin: 20 }}>
                            <List>
                                <ListItem>
                                    <HelpCentreItem />
                                </ListItem>
                                <ListItem>
                                    <HelpCentreItem />
                                </ListItem>
                            </List>
                    </View>
                </Content>
                <View style={{ bottom: 1, flex: 1, alignItems: 'center', position: 'relative' }}>
                    <SubmitButton >
                    CALL HEROES
                    </SubmitButton>
                </View>
            </Container>
        );
    }
}
export default HelpCentre;
