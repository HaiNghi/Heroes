import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Text } from 'native-base'; 
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';
import SearchBox from '../SearchBox';
import SearchResult from '../SearchResults';
import { SubmitButton } from '../common';
import styles from './MapContainerStyle';
/* eslint-disable global-require */

class MapContainer extends Component {
        constructor(props) {
            super(props);
            this.state = { modalWarningShow: false };
        }

        //unable warning modal
        onDecline() {
            this.setState({ modalWarningShow: false });
        }

        //Get the coordinate, depending on the number of locations
        getState(c1, c2) {
            let check = c2;
            if (this.props.currentLocation.dropOff && this.props.deleted === false) {
                check = this.calculateAverate(c1, c2);
            }
            return check;
        }

        calculateAverate(c1, c2) {
            return (c1 === null) ? c2 : ((Math.abs(c1) + Math.abs(c2)) / 2);
        }

        //navigate to other screen
        navigateToScreen() {
            if (this.props.pickUp === '' || this.props.dropOff === '') {
                this.setState({ modalWarningShow: true });
            } else {
                this.props.navigation.navigate('PackageRegister', 
                                                { pickUpLocationAddress: this.props.pickUp, 
                                                dropOffLocationAddress: this.props.dropOff,
                                                pickUpCoordinate: this.props.region,
                                                destinationCoordinate: this.props.nextRegion
                                                });
            }
        }
        
        render() {
            const {
                region, 
                getInputData, 
                toogleSearchResult, 
                getAddressPredictions, 
                resultTypes, 
                predictions, 
                inputData,
                getSelectedAddress,
                getPickUp,
                getDropOff,
                pickUp,
                dropOff,
                nextRegion,
                deleteResultAddress,
                } = this.props;
                console.log(region);
            return (
                <View style={styles.container}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        /* ref = {(ref) => {viewMarker(),this.mapRef = ref}}
                        onLayout = {()=>{
                            alert("aa"),this.mapRef.fitToCoordinates(arrMarker,{ edgePadding: { top: 10, right: 10, left: 10 }, animated: false})}} */
                         region={{
                            latitude: this.getState(nextRegion.latitude, region.latitude),
                            longitude: this.getState(nextRegion.longitude, region.longitude),
                            latitudeDelta: (nextRegion.latitudeDelta === null) ? 0.04 : 0.092,
                            longitudeDelta: (nextRegion.longitudeDelta === null) ? region.longitudeDelta : 0.04
                        }} 
                        showsUserLocation
                    >
                    <MapView.Marker 
                        coordinate={region}
                        pinColor='red' 
                    />
                    {
                        (nextRegion.latitude !== null) &&
                            <MapView.Marker 
                            coordinate={nextRegion}
                            pinColor='green'
                            />
                    }
                   
                    </MapView>
        
                    <SearchBox 
                        getInputData={getInputData} 
                        toogleSearchResult={toogleSearchResult} 
                        getAddressPredictions={getAddressPredictions} 
                        inputData={inputData}
                        resultTypes={resultTypes}
                        region={region}
                        getPickUp={getPickUp}
                        getDropOff={getDropOff}
                        pickUp={pickUp}
                        dropOff={dropOff}
                        deleteResultAddress={deleteResultAddress}
                    />
                        
                    { (resultTypes.pickUp || resultTypes.dropOff) &&
                        <SearchResult 
                            predictions={predictions} getSelectedAddress={getSelectedAddress}
                        />
                    }
                    { (!resultTypes.pickUp || !resultTypes) &&
                    <SubmitButton onPress={() => this.navigateToScreen()}>
                       PACKAGE INFORMATION
                    </SubmitButton>
                    }
                    <Modal isVisible={this.state.modalWarningShow} >
                        <View style={styles.innerContainer}>
                            <Image 
                                source={require('../image/warning.png')}
                                style={styles.imageStyle}
                            />
                            <Text style={styles.textStyle}>You need to fulfill all locations!</Text>
                            <SubmitButton onPress={() => this.onDecline()}>
                                DISMISS
                            </SubmitButton> 
                        </View>
                    </Modal>
                </View> 
            );
        }
}
    
export default MapContainer;
