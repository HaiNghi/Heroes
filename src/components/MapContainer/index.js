import React, { Component } from 'react';
import { View, Image, Alert, AsyncStorage } from 'react-native';
import { Text } from 'native-base'; 
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import firebase from 'firebase';
import PushNotification from 'react-native-push-notification';
import { pushNotifications } from '../../notificationService';
import SearchBox from '../SearchBox';
import SearchResult from '../SearchResults';
import { SubmitButton } from '../common';
import styles from './MapContainerStyle';

/* eslint-disable global-require */
pushNotifications.configure();

class MapContainer extends Component {
        constructor(props) {
            super(props);
            this.state = { modalWarningShow: false, id: 0 };
        }
        componentDidMount() {
            this.pushNotification();
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

        customAlert(text) {
            Alert.alert(
                null,
                `Please input ${text} !`,
                [{ text: 'OK', onPress: () => console.log('OK'), style: 'cancel' }],
                { cancelable: false }
              );
        }

        //navigate to other screen
        navigateToScreen() {
            if (this.props.pickUp === '') this.customAlert('pick-up location'); 
            else if (this.props.dropOff === '') this.customAlert('drop-off location');
                else {
                    this.props.navigation.navigate('PackageRegister', 
                    { pickUpLocationAddress: this.props.pickUp, 
                    dropOffLocationAddress: this.props.dropOff,
                    pickUpCoordinate: this.props.region,
                    destinationCoordinate: this.props.nextRegion
                    });
                }
        }
        //push notification
        pushNotification = () => {
            let pickedPackage = '';
            const array = [];
            console.log(array);
            AsyncStorage.getItem('user_info', (error, result) => {
                this.setState({ id: JSON.parse(result).user_id });
                const ref = firebase.database().ref(`package/package-owner/${this.state.id}`);
                ref.on('child_added', snapshot => {
                        pickedPackage = snapshot.val();
                        array.push(pickedPackage);
                        console.log(array);
                        if (pickedPackage.status === 2 && pickedPackage.is_shown === 1) {
                            PushNotification.localNotification({
                                title: `Your package: ${pickedPackage.id} has been picked up! `,
                                message: `By shipper ID: ${pickedPackage.shipper_id} \nDestination: ${pickedPackage.destination_address}`,
                                playSound: true,
                                soundName: 'default',
                                userInfo: { id: `${pickedPackage.id}` }
                            });
                            ref.off();
                            ref.child(`${pickedPackage.id}`).update({
                                is_shown: 0
                            });
                            ref.off();
                        }
                });
                ref.on('child_changed', snapshot => {
                    pickedPackage = snapshot.val();
                    if (pickedPackage.status === 4 && pickedPackage.is_shown === 1) {
                        PushNotification.localNotification({
                            title: `Your package: ${pickedPackage.id} has been delivered successfully! `,
                            message: `By shipper ID: ${pickedPackage.shipper_id} \nDestination: ${pickedPackage.destination_address}`,
                            playSound: true,
                            soundName: 'default',
                            userInfo: { id: `${pickedPackage.id}` }
                        });
                        ref.child(`${pickedPackage.id}`).update({
                            is_shown: 0
                        });
                        ref.off();
                    }
                });
            });
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
                        
                    { ((resultTypes.pickUp && pickUp !== '') || (resultTypes.dropOff && dropOff !== '')) &&
                        <SearchResult 
                            predictions={predictions} getSelectedAddress={getSelectedAddress}
                        />
                    }
                    { (!resultTypes || (!resultTypes.pickUp && !resultTypes.dropOff)) &&
                    <SubmitButton onPress={() => this.navigateToScreen()}>
                       DELIVER
                    </SubmitButton>
                    }
                </View> 
            );
        }
}
export default MapContainer;
