import React, { Component } from 'react';
import { Container, List, ListItem, Content } from 'native-base';
import { HeaderBase } from './common';
import HistoryItem from './HistoryItem';

class Histories extends Component {
    componentDidMount() {
        this.props.getHistoryList();
    }

    componentWillUnmount() {
        this.refreshList();
    }
    //navigate to the other screen
    navigateToScreen = (historyId) => {
        this.props.navigation.navigate('HistoryItems', { id: historyId, refreshList: this.refreshList.bind(this), fromNotification: false });
    }
    //refresh history list
    refreshList = () => {
        this.props.getHistoryList();
    }

    
    render() {
        return (
            <Container>
                <HeaderBase headerText='History' navigation={this.props.navigation} />
                <Content>
                    <List>
                        {
                            this.props.historyList.map((item) => {
                                return (
                                    <ListItem onPress={() => this.navigateToScreen(item.id)} key={item.id}>
                                        <HistoryItem 
                                            pickUpLocationAddress={item.pickup_location_address}
                                            destinationAddress={item.destination_address}
                                            status={item.status}
                                            date={item.created_at}
                                        />
                                    </ListItem>
                                );
                            })
                        }
                    </List>
                </Content>
            </Container>
        );
    }
}
export default Histories;
