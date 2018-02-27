import React, { Component } from 'react';
import { View, Picker, Text, Image, Button } from 'react-native';
import { Container } from 'native-base';
import Modal from 'react-native-modal';
import { HeaderBase, Inputs, SubmitButton, Confirm } from './common';
import textInputStyles from './SearchBox/SearchBoxStyles';
import styles from './styles';

class PackageRegister extends Component {
    state = { modalShow: false };
    
    onAccept() {
        this.setState({ modalShow: false });
    }

    onDecline() {
        this.setState({ modalShow: false });
        this.props.navigation.navigate('Home');
    }

    bookPackage() {
        this.setState({ modalShow: !this.state.modalShow });
    }
     render() {
        return (
            <Container style={{ backgroundColor: '#E9E9E9' }}>
                <HeaderBase headerText="Package Information" navigation={this.props.navigation} />
                <View>
                    <View style={textInputStyles.inputWrapper}>
                        <Inputs 
                            placeholder="Customer's name"
                            /* value={this.props.name}  */
                            /* onChangeText={value => this.props.employeeUpdate({prop: 'name', value})} */
                        />
                    </View>
                    <View style={textInputStyles.inputWrapper}>
                        <Inputs 
                            placeholder="Phone number"
                            /* value={this.props.name}  */
                            /* onChangeText={value => this.props.employeeUpdate({prop: 'name', value})} */
                        />
                    </View>
                    
                    <View style={textInputStyles.inputWrapper}>
                        <Inputs 
                            editable={false}
                            /* value={this.props.name}  */
                            /* onChangeText={value => this.props.employeeUpdate({prop: 'name', value})} */
                        />
                    </View>
                    <View style={textInputStyles.inputWrapper}>
                        <Inputs 
                            editable={false}
                            /* value={this.props.name}  */
                            /* onChangeText={value => this.props.employeeUpdate({prop: 'name', value})} */
                        />
                    </View>
                    <View style={textInputStyles.inputWrapper}>
                        <Text style={styles.pickerTextStyle}>Types of package </Text>
                        <Picker
                            /* selectedValue={ abc } */
                            onValueChange={() => console.log('abc')}
                        >
                            <Picker.Item label="Light" value="Light" />
                            <Picker.Item label="Medium" value="Medium" />
                            <Picker.Item label="Big" value="Big" />
                        </Picker>
                    </View>
                </View>
                <View style={{ bottom: 1, flex: 1, alignItems: 'center', position: 'relative' }}>
                    <SubmitButton onPress={this.bookPackage.bind(this)}>
                        BOOK
                    </SubmitButton>
                </View>

                {/* <Confirm
                    visible={this.state.modalShow}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Book sucessfully! Please wait for shipper after few minutes!
                </Confirm> */}
                <Modal isVisible={this.state.modalShow}>
                        <View style={styles.innerContainer}>
                            <Image 
                                source={require('./image/checked.png')}
                                style={{ width: 50, height: 50, marginTop: 15 }}
                            />
                            <Text style={styles.textStyle}>Book sucessfully! Please wait for shipper after few minutes!</Text>
                            {/* <Button onPress={this.onDecline.bind(this)} title="DISMISS" style={{ alignItems: 'center' }}/> */}
                            <SubmitButton onPress={() => this.onDecline()}>
                                DISMISS
                            </SubmitButton>
                        </View>
                </Modal>
            </Container>
        );
    }
}
export default PackageRegister;
