import React, { Component } from 'react';
import { Image, Alert } from 'react-native';
import { Container, View, Text, Button, Picker } from 'native-base';
import Modal from 'react-native-modal';
import { HeaderBase, Inputs, SubmitButton, Spinner } from './common';
import { PackageRegisterStyle, styles } from './styles';

/* eslint-disable global-require */

export default class PackageRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
          typeOfPackage: '',
          height: '',
          width: '',
          length: '',
          weight: '',
          editable: true,
          modalWarningShow: false,
          showPrice: false,
          checkTypeOfPackage: ''
        };
      }

    componentDidMount() {
        const { params } = this.props.navigation.state;
        this.props.getDistanceMatrix(params.pickUpCoordinate, params.destinationCoordinate);
        this.props.getNormalPackage();
        this.props.getOptionalPackage();
        this.props.disablePrice();
    }

    onAccept = () => {
        this.setState({ modalShow: false });
    }

    //input value for TextInput and check if price can be calculated
    onCheck = (value, type) => {
        if (this.props.showPrice) {
            this.props.disablePrice();
        }
        switch (type) {
            case 'typeOfPackage' : {
                this.setState({ typeOfPackage: value }, function () {
                    this.getPrice(); 
                });
                break;
            }
            case 'height': {
                this.setState({ height: value }, function () {
                    this.getPrice(); 
                });
                break;
            }
            case 'width': {
                this.setState({ width: value }, function () {
                    this.getPrice(); 
                });
                break;
            }
            case 'length': {
                this.setState({ length: value }, function () {
                    this.getPrice(); 
                }); 
                break;
            }
            case 'weight': {
                this.setState({ weight: value }, function () {
                    this.getPrice(); 
                }); break;
            }
            default:
        }
    }
   
    //go back to previous screen
    onDismiss() {
        this.props.navigation.goBack();
    }
    //get the price for the trip
    getPrice = () => {
        const { height, weight, width, length, typeOfPackage } = this.state;
        const { distanceMatrix, duration } = this.props;
        if (height !== '' && weight !== '' && width !== '' && length !== '') {
            this.setState({ checkTypeOfPackage: 'optional' }, function () {
                this.props.getPrice(height, width, weight, length, distanceMatrix, duration, this.state.checkTypeOfPackage);
            });
            this.setState({ showPrice: true });
        } else {
            if (typeOfPackage !== 0) {
                this.setState({ checkTypeOfPackage: 'normal' }, function () {
                    this.props.getPrice(height, width, typeOfPackage, length, distanceMatrix, duration, this.state.checkTypeOfPackage);
                });
                this.setState({ showPrice: true });
            } else {
                this.setState({ showPrice: false });
            }
        }
    }
    //show alert of validation
    validateField(text) {
        Alert.alert(
            `${text}`,
            null,
            [{ text: 'OK', onPress: () => console.log('OK Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
          );
    }
    //unable warning modal
    disableModal = () => {
        this.setState({ modalWarningShow: false });
    }
    //book the package
    bookPackage = () => {
        this.setState({ showSpinner: true });
        const { params } = this.props.navigation.state;
        const { customerName, customerPhone, distanceMatrix, duration, price } = this.props;
        const { height, weight, width, length, checkTypeOfPackage, typeOfPackage } = this.state;
        const { pickUpLocationAddress, dropOffLocationAddress } = this.props.navigation.state.params;
        
        if (customerName !== '' && customerPhone !== '' && customerPhone.length >= 10) {
            if (checkTypeOfPackage === 'optional') {
                this.props.loading();
                this.props.bookPackage(weight, customerName, customerPhone, 
                    params.pickUpCoordinate, params.destinationCoordinate,
                    distanceMatrix, duration,
                    height, width, length, price, checkTypeOfPackage, pickUpLocationAddress, dropOffLocationAddress
                );
            } else {
                console.log('OK', typeOfPackage, checkTypeOfPackage);
                this.props.loading();
                this.props.bookPackage(typeOfPackage, customerName, customerPhone, 
                    params.pickUpCoordinate, params.destinationCoordinate,
                    distanceMatrix, duration,
                    height, width, length, price, checkTypeOfPackage, pickUpLocationAddress, dropOffLocationAddress
                );
            }
        } 
        if (customerName === '') {
            this.validateField('Please input receiver\'s name');
        } else {
            (customerPhone === '') ?
                this.validateField('Please input receiver\'s phone number')
            : (((customerPhone.length < 10)) ? this.validateField('Invalid phone number!') : null);
            }
        }
    //check validation for name
    validateForName = (text) => {
        const reg = /^[a-zA-Z\s]+$/;
        if (!reg.test(text)) {
            Alert.alert('Invalid name! Please input again!');
        } 
        this.props.getCustomerName(text);
    }
    // navigate to home screen
    navigateToScreen = () => {
        this.props.onDecline();
        // this.props.navigation.navigate('Home');
        this.props.navigation.state.params.deleteInput();
        this.props.navigation.goBack(null);
    }
    //create the array [1,...49]
    renderArray = (start, end) => {
        return Array.from({ length: (end - start) }, (v, k) => k + start);
    }
    //render from json list to array list and show in picker
    renderItem = () => {
        const items = [];
        for (const item of this.renderArray(1, 50)) {
            items.push(<Picker.Item label={item} value={item} key={item} />);
        }
        return items;
    }
   
    
     render() {
        const { params } = this.props.navigation.state;
        console.log(this.props.showSpinner, this.props.success);
        return (
            <Container style={styles.containerStyle}>
                <HeaderBase headerText="Package Information" navigation={this.props.navigation} />
                <View>
                    <View style={[PackageRegisterStyle.inputWrapper]}>
                        <Text style={PackageRegisterStyle.label}>Location </Text>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                            <Image 
                                style={{ height: 20, width: 20, marginRight: 5 }}
                                source={require('./image/placeholder.png')} 
                            />
                            <Text style={{ fontSize: 14 }}>{params.pickUpLocationAddress} </Text>
                           
                        </View>
                        <View style={{ flexDirection: 'row', margin: 5 }}>
                                <Image 
                                    style={{ height: 20, width: 20, marginRight: 5 }}
                                    source={require('./image/destination.png')} 
                                />
                                <Text style={{ fontSize: 14 }}>{params.dropOffLocationAddress} </Text>
                        </View> 
                               
                    </View>
                    <View style={[PackageRegisterStyle.inputWrapper, { marginTop: 20 }]}>
                        <Text style={PackageRegisterStyle.label}>Receiver's info </Text>
                        <Inputs 
                            placeholder="Full name"
                            value={this.props.customerName}
                            onChangeText={value => this.validateForName(value)}
                            keyboardType="default"
                            returnKeyType="done"
                            maxLength={50}
                        />
                        <Inputs 
                                placeholder="Phone number"
                                value={this.props.customerPhone}
                                onChangeText={value => this.props.getCustomerPhone(value)}
                                keyboardType="number-pad"
                                returnKeyType="done"
                                maxLength={11}
                        />
                    </View>
                    <View style={PackageRegisterStyle.inputWrapper}>
                        <Text style={PackageRegisterStyle.label}>Package's info </Text>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <Text style={PackageRegisterStyle.pickerText} >Type of package: </Text>
                                <Picker
                                    enabled={this.state.editable}
                                    mode="drop"
                                    placeholder="Select One"
                                    onValueChange={(value) => this.onCheck(value, 'typeOfPackage')}
                                    selectedValue={this.state.typeOfPackage}
                                >
                                    {this.props.normalPackageList.map((item) => {
                                        return (
                                            <Picker.Item label={item.name} value={item.id} key={item.id} />
                                        );
                                    })}
                                </Picker>
                            </View>
                            {
                                (this.state.typeOfPackage === 0) &&
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={PackageRegisterStyle.pickerText}>Height (cm): </Text>
                                        <Picker
                                            enabled={this.state.editable}
                                            mode="drop"
                                            placeholder="Select One"
                                            onValueChange={(value) => this.onCheck(value, 'height')}
                                            selectedValue={this.state.height}
                                        >
                                            {this.renderItem()}
                                            
                                        </Picker>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={PackageRegisterStyle.pickerText}>Width  (cm): </Text>
                                        <Picker
                                            enabled={this.state.editable}
                                            mode="drop"
                                            placeholder="Select One"
                                            onValueChange={(value) => this.onCheck(value, 'width')}
                                            selectedValue={this.state.width}
                                        >
                                            {this.renderItem()}
                                            
                                        </Picker>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={PackageRegisterStyle.pickerText}>Length (cm): </Text>
                                        <Picker
                                            enabled={this.state.editable}
                                            mode="drop"
                                            placeholder="Select One"
                                            onValueChange={(value) => this.onCheck(value, 'length')}
                                            selectedValue={this.state.length}
                                        >
                                            {this.renderItem()}
                                            
                                        </Picker>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={PackageRegisterStyle.pickerText}>Weight (kg) : </Text>
                                        <Picker
                                            enabled={this.state.editable}
                                            mode="drop"
                                            placeholder="Select One"
                                            onValueChange={(value) => this.onCheck(value, 'weight')}
                                            selectedValue={this.state.weight}
                                        >
                                            <Picker.Item label="< 5kg" value={1} />
                                            <Picker.Item label="05 - 10kg" value={2} />
                                            <Picker.Item label="10 - 15kg" value={3} />
                                            <Picker.Item label="15 - 20kg" value={4} />
                                            
                                        </Picker>
                                    </View>
                                </View>
                                
                            }
                            
                    </View>
                    
                </View>
                
                { (this.state.showPrice) &&
                        <View style={PackageRegisterStyle.priceWrapper}>
                            <View style={{ flex: 2, marginLeft: 10 }}>
                                <Text style={[styles.textStyle, { color: '#fff', textAlign: 'auto' }]}>VND {this.props.price}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Button transparent onPress={() => this.bookPackage()}>
                                    <Text style={styles.textStyle}>BOOK</Text>
                                </Button>
                            </View>
                        </View> 
                }
                
                <Modal isVisible={this.props.showSpinner}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                        <Spinner />
                    </View>
                </Modal> 

                <Modal isVisible={this.props.success}>
                    <View style={styles.innerContainer}>
                        <Image 
                            source={require('./image/checked.png')}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.textStyle}>Book sucessfully! Please wait for shipper after few minutes!</Text>
                        <SubmitButton onPress={() => this.navigateToScreen()}>
                            DISMISS
                        </SubmitButton> 
                    </View>
                </Modal>

                <Modal isVisible={this.state.modalWarningShow} >
                    <View style={styles.innerContainer}>
                        <Image 
                            source={require('./image/warning.png')}
                            style={styles.imageStyle}
                        />
                        <Text style={styles.textStyle}>Please check your fields again. They maybe empty or invalid!</Text>
                        <SubmitButton onPress={() => this.disableModal()}>
                            DISMISS
                        </SubmitButton> 
                    </View>
                </Modal>
               

                {/* <View style={{ flex: 1 }}>
                    <Spinner visible={this.state.showSpinner} textContent={'Loading...'} textStyle={{ color: 'red' }} />
                </View>  */}
            </Container>
            
        );
    }
}
// export default PackageRegister;
