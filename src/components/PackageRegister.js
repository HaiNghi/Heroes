import React, { Component } from 'react';
import { Picker, Image } from 'react-native';
import { Container, View, Text } from 'native-base';
import Modal from 'react-native-modal';
import { Form, FormItem } from 'react-native-form-validation';
import { HeaderBase, Inputs, SubmitButton } from './common';
import { PackageRegisterStyle, styles } from './styles';

/* eslint-disable global-require */

class PackageRegister extends Component {
    state = { modalShow: false };

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.props.getDistanceMatrix(params.pickUpCoordinate, params.destinationCoordinate);
    }
    
    onAccept() {
        this.setState({ modalShow: false });
    }

    onDecline() {
        this.setState({ modalShow: false });
        this.props.navigation.navigate('Home');
    }

    bookPackage() {
        const { params } = this.props.navigation.state;
        this.props.bookPackage(this.props.customerName, 
                            this.props.customerPhone, 
                            params.pickUpCoordinate,
                            params.destinationCoordinate,
                            this.props.distanceMatrix
                        );
        this.setState({ modalShow: !this.state.modalShow });
    }

    
     render() {
        const { params } = this.props.navigation.state;
        return (
            <Container style={styles.containerStyle}>
                <HeaderBase headerText="Package Information" navigation={this.props.navigation} />
                <View>
                    <View style={PackageRegisterStyle.inputWrapper}>
                        <Inputs 
                            placeholder="Customer's name"
                            value={params.customerName}
                            onChangeText={value => this.props.getCustomerName(value)}
                        />
                    </View>
                    <View style={PackageRegisterStyle.inputWrapper}>
                        <Inputs 
                            placeholder="Phone number"
                            value={params.customerPhone}
                            onChangeText={value => this.props.getCustomerPhone(value)}
                        />
                    </View>
                    <View style={PackageRegisterStyle.inputWrapper}>
                        <Inputs 
                            editable={false}
                            value={params.pickUpLocation} 
                            moreStyle={{ backgroundColor: '#ACD1D1D1', borderRadius: 7 }}
                        />
                    </View>
                    <View style={PackageRegisterStyle.inputWrapper}>
                        <Inputs 
                            editable={false}
                            value={params.dropOffLocation} 
                            moreStyle={{ backgroundColor: '#ACD1D1D1', borderRadius: 7 }}
                        />
                    </View>
                    <View style={PackageRegisterStyle.inputWrapper}>
                        <Text style={styles.pickerTextStyle}>Size of package </Text>
                        <Picker
                            /* selectedValue={ abc } */
                            onValueChange={() => console.log('abc')}
                        >
                            <Picker.Item label="Small" value="Small" />
                            <Picker.Item label="Medium" value="Medium" />
                            <Picker.Item label="Big" value="Big" />
                        </Picker>
                    </View>
                    
                </View>
                <View style={{ bottom: 1, flex: 1, alignItems: 'center', position: 'relative', marginTop: 30 }}>
                    <SubmitButton onPress={() => this.bookPackage()}>
                        BOOK
                    </SubmitButton>
                </View>

                <Modal isVisible={this.state.modalShow} >
                    <View style={styles.innerContainer}>
                        <Image 
                            source={require('./image/checked.png')}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.textStyle}>Book sucessfully! Please wait for shipper after few minutes!</Text>
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
