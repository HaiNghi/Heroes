import React from 'react';
import { Text, Keyboard } from 'react-native';
import { View, InputGroup, Input, Icon, Button } from 'native-base';
import styles from './SearchBoxStyles';

 const SearchBox = ({ 
                        toogleSearchResult, 
                        getAddressPredictions, 
                        region,
                        getPickUp,
                        getDropOff,
                        pickUp,
                        dropOff,
                        deleteResultAddress
                    }) => {
    //input pick-up location                    
    function handleGetPickUp(text) {
        getPickUp(text);
        if (text !== '') {
            toogleSearchResult('pickUp');
            getAddressPredictions(text, { region });
        }  
    }
    //input drop-off location  
    function handleGetDropOff(text) {
        getDropOff(text);
        if (text !== '') {
            toogleSearchResult('dropOff');
            getAddressPredictions(text, { region });
        }  
    }
    //delete input field when clicking delete button
    function deleteAddress(text) {
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
                        style={styles.inputSearch} placeholder="Choose pick-up location" 
                        onChangeText={
                            handleGetPickUp.bind(this)
                    }
                        value={pickUp}
                    />
                    {
                        (pickUp !== '') &&
                        <Button transparent onPress={deleteAddress.bind(this, 'pickUp')} accessible={false}>
                            <Icon name="md-close" size={15} color="#ff5e3a" />
                        </Button>
                    }
                   
                </InputGroup>
            </View>
            <View style={styles.secondInputWrapper}>
                <Text style={styles.label}>DROP OFF</Text>
                <InputGroup>
                    <Button transparent>
                        <Icon name="search" size={15} color="#ff5e3a" />  
                    </Button>

                    <Input 
                        style={styles.inputSearch} placeholder="Choose drop-off location" 
                        onChangeText={
                            handleGetDropOff.bind(this)
                        }
                        value={dropOff}
                    />
                    {
                        (dropOff !== '') &&
                        <Button transparent onPress={deleteAddress.bind(this, 'dropOff')} accessible={false}>
                            <Icon name="md-close" size={15} color="#ff5e3a" />
                        </Button>
                    }
                   
                </InputGroup>
            </View>
            
        </View>
    );
};

export default SearchBox;
