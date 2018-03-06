import React, { Component } from 'react';
import { 
    Container, 
    List, 
    ListItem, 
    Text, 
    Content, 
    View, 
    Button, 
    Left, 
    Right, 
} from 'native-base';
import Modal from 'react-native-modal';
import { HeaderBase } from './common';
import NotificationItem from './NotificationItem';
import { styles } from './styles';
import NotificationData from './NotificationData';

class Notifications extends Component {
    state = { delete: false };

    onDelete() {

    }

    onCancel() {
        this.setState({ delete: false });
    }
    deleteAll() {
        this.setState({ delete: true });
    }

    
    render() {
        return (
            <Container>
                <HeaderBase 
                    headerText='Notifications' 
                    navigation={this.props.navigation} 
                    right={true} 
                    onPress={() => this.deleteAll()} 
                />
                <Content>
                    <View style={{ backgroundColor: '#fff', margin: 20 }}>
                            <List>
                            {
                                NotificationData.map(item => {
                                    return (
                                        <ListItem key={item.key}>
                                            <NotificationItem item={item} />
                                        </ListItem>
                                    );
                                })
                            }
                            </List>
                        
                    </View>
                    <Modal isVisible={this.state.delete} >
                            <View style={styles.innerContainer}>
                                <Text style={styles.textStyle}>Delete all?</Text>
                                <Text note>Once you delete all messages, you can not undo it!</Text>
                                <Container style={{ flex: 1, flexDirection: 'row' }}>
                                    <Left style={{ margin: 10 }}>
                                        <Button block light onPress={() => this.onCancel()}><Text>CANCEL</Text></Button>
                                    </Left>
                                    <Right style={{ margin: 10 }} onPress={() => this.onDelete()}>
                                        <Button block danger><Text>DELETE ALL</Text></Button>
                                    </Right>
                                </Container>
                            </View>
                    </Modal>
                </Content>
            </Container>
        );
    }
}
export default Notifications;
