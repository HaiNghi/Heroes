import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, View, Text, Button, Picker } from 'native-base';
import Modal from 'react-native-modal';
// import Spinner from 'react-native-loading-spinner-overlay';
import { HeaderBase, Inputs, SubmitButton } from './common';
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
    onDismiss() {
        this.props.navigation.goBack();
    }
    getPrice = () => {
        const { height, weight, width, length, typeOfPackage } = this.state;
        const { distanceMatrix, duration } = this.props;
        if (height !== '' && weight !== '' && width !== '' && length !== '') {
            this.setState({ checkTypeOfPackage: 'optional' }, function () {
                this.props.getPrice(height, width, weight, length, distanceMatrix, duration, this.state.checkTypeOfPackage);
            });
            this.setState({ showPrice: true });
        } else {
            console.log(typeOfPackage);
            if (typeOfPackage !== 0) {
                this.setState({ checkTypeOfPackage: 'normal' }, function () {
                    this.props.getPrice(height, width, typeOfPackage, length, distanceMatrix, duration, this.state.checkTypeOfPackage);
                });
                this.setState({ showPrice: true });
            } else {
                this.setState({ showPrice: false });
            }
        }
        // this.setState({ showPrice: true });
        // if (height === '' || weight === '' || width === '' || length === '') {
        //     // alert('Please fulfill size of package!');
        //     console.log('OK');
        // } else {
        //     this.setState({ showPrice: true });
        //     this.props.getPrice(height, width, weight, length, distanceMatrix, duration);
        // }
    }
    disableModal = () => {
        this.setState({ modalWarningShow: false });
    }
    bookPackage = () => {
        this.setState({ showSpinner: true });
        const { params } = this.props.navigation.state;
        const { customerName, customerPhone, distanceMatrix, duration, price } = this.props;
        const { height, weight, width, length, checkTypeOfPackage, typeOfPackage } = this.state;
        
        if (customerName !== '' && customerPhone !== '' && customerPhone.length >= 10) {
            if (checkTypeOfPackage === 'optional') {
                this.props.bookPackage(weight, customerName, customerPhone, 
                    params.pickUpCoordinate, params.destinationCoordinate,
                    distanceMatrix, duration,
                    height, width, length, price, checkTypeOfPackage
                );
            } else {
                console.log('OK', typeOfPackage, checkTypeOfPackage);
                this.props.bookPackage(typeOfPackage, customerName, customerPhone, 
                    params.pickUpCoordinate, params.destinationCoordinate,
                    distanceMatrix, duration,
                    height, width, length, price, checkTypeOfPackage
                );
            }
        } else {
            this.setState({ modalWarningShow: true });
        }
    }

    validateForName = (text) => {
        const reg = /^[a-zA-Z\s]+$/;
        if (!reg.test(text)) {
            alert('Invalid name! Please input again!');
        } 
        this.props.getCustomerName(text);
    }
    navigateToScreen = () => {
        this.props.onDecline();
        this.props.navigation.navigate('Home');
    }
    renderArray = (start, end) => {
        return Array.from({ length: (end - start) }, (v, k) => k + start);
    }
    renderItem = () => {
        const items = [];
        for (const item of this.renderArray(1, 50)) {
            items.push(<Picker.Item label={item} value={item} key={item} />);
        }
        return items;
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
                            onChangeText={value => this.validateForName(value)}
                            keyboardType="default"
                            returnKeyType="done"
                            maxLength={50}
                            minLength={3}
                        />
                    </View>
                    <View style={PackageRegisterStyle.inputWrapper}>
                            <Inputs 
                                placeholder="Phone number"
                                value={params.customerPhone}
                                onChangeText={value => this.props.getCustomerPhone(value)}
                                keyboardType="number-pad"
                                returnKeyType="done"
                                maxLength={11}
                                minLength={10}
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
                        <Text style={PackageRegisterStyle.label}>Package </Text>
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
                                <Text style={[styles.textStyle, { color: '#fff', textAlign: 'auto' }]}>VND  {this.props.price}</Text>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row' }}>
                                <Button transparent onPress={() => this.bookPackage()}>
                                    <Text style={styles.textStyle}>BOOK</Text>
                                </Button>
                                <Button transparent onPress={() => this.onDismiss()}>
                                    <Text style={styles.textStyle}>DISMISS</Text>
                                </Button>
                            </View>
                        </View> 
                }
                {/*                 
                <View style={{ bottom: 1, flex: 1, alignItems: 'center', position: 'relative', marginTop: 30 }}>
                    <SubmitButton onPress={() => this.getPrice()}>
                        GET PRICE
                    </SubmitButton>
                </View> */}

                <Modal isVisible={this.props.success} >
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
