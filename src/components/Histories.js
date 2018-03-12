import React, { Component } from 'react';
import { Container, List, ListItem, Text, Content } from 'native-base';
import { HeaderBase } from './common';
import HistoryItem from './HistoryItem';

class Histories extends Component {
    onChangePage() {
        this.props.navigation.navigate('DetailItem');
    }
    render() {
        return (
            <Container>
                <HeaderBase headerText='History' navigation={this.props.navigation} />
                <Content>
                    <List>
                        <ListItem onPress={() => this.onChangePage()}>
                            <HistoryItem />
                        </ListItem>
                        <ListItem>
                            <HistoryItem />
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}
export default Histories;
