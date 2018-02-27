import React from 'react';
import { Text, Keyboard } from 'react-native';
import { View, InputGroup, Input, Icon, Button } from 'native-base';
import styles from './SearchBoxStyles';

export const SearchBox = ({ 
                            // getInputData, 
                            toogleSearchResult, 
                            getAddressPredictions, 
                            // resultTypes, 
                            // inputData, 
                            region,
                            getPickUp,
                            getDropOff,
                            pickUp,
                            dropOff,
                            deleteResultAddress
                        }) => {
    function handleGetPickUp(text) {
        getPickUp(text);
        getAddressPredictions(text, { region });
    }

    function handleGetDropOff(text) {
        getDropOff(text);
        getAddressPredictions(text, { region });
    }

    function deleteAddress(text) {
        // alert("OK");
        deleteResultAddress(text);
        Keyboard.dismiss();
    }

    return (
        <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>PICK UP</Text>
                <InputGroup>
                    <Button transparent>
                        <Icon name="search" size={15} color="#ff5e3a" />
                    </Button>
                    
                    <Input 
                        onFocus={() => toogleSearchResult('pickUp')} style={styles.inputSearch} placeholder="Choose pick-up location" 
                        onChangeText={
                            handleGetPickUp.bind(this)
                    }
                        value={pickUp}
                    />
                    <Button transparent onPress={deleteAddress.bind(this, 'pickUp')} accessible={false}>
                        <Icon name="md-close" size={15} color="#ff5e3a" />
                    </Button>
                </InputGroup>
            </View>
            <View style={styles.secondInputWrapper}>
                <Text style={styles.label}>DROP OFF</Text>
                <InputGroup>
                    <Button transparent>
                        <Icon name="search" size={15} color="#ff5e3a" />  
                    </Button>

                    <Input 
                        onFocus={() => toogleSearchResult('dropOff')} style={styles.inputSearch} placeholder="Choose drop-off location" 
                        onChangeText={
                            handleGetDropOff.bind(this)
                        }
                        value={dropOff}
                    />
                    <Button transparent onPress={deleteAddress.bind(this, 'dropOff')} accessible={false}>
                        <Icon name="md-close" size={15} color="#ff5e3a" />
                    </Button>
                </InputGroup>
            </View>
            
        </View>
    );
};

export default SearchBox;
