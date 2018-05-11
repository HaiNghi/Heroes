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
let user = [];
AsyncStorage.getItem('user_info', (error, result) => {
    user = JSON.parse(result);
});
pushNotifications.configure();

class MapContainer extends Component {
        constructor(props) {
            super(props);
            this.state = { modalWarningShow: false, id: 0 };
            this.mapRef = null;
            PushNotification.configure({
                onNotification: (notification) => {
                    console.log(notification);
                    this.props.navigation.navigate('HistoryItems', { id: notification.data.id, fromNotification: true });
                },
                permissions: {
                    alert: true,
                    badge: true,
                    sound: true
                },
                popInitialNotification: true,
                requestPermissions: true
            });
        }
        componentDidMount() {
            this.pushNotification();
        }

        componentWillReceiveProps() {
            this.mapRef.fitToElements(true);
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
                `Please input ${text} !`,
                null,
                [{ text: 'OK', onPress: () => console.log('OK'), style: 'cancel' }],
                { cancelable: false }
              );
        }

        //navigate to other screen
        navigateToScreen() {
            if (this.props.pickUp === '') this.customAlert('pick-up location'); 
            else if (this.props.dropOff === '') this.customAlert('drop-off location');
             else if (this.props.pickUp === this.props.dropOff) this.customAlert('different pick-up and drop-off locations');
                else {
                    this.props.navigation.navigate('PackageRegister', 
                    { pickUpLocationAddress: this.props.pickUp, 
                    dropOffLocationAddress: this.props.dropOff,
                    pickUpCoordinate: this.props.region,
                    destinationCoordinate: this.props.nextRegion,
                    deleteInput: this.deleteInput.bind(this)
                    });
                }
        }
        // delete pickUp and dropOff fields 
        deleteInput = () => {
            this.props.deleteInput();
        }
        //push notification
        pushNotification = () => {
            let pickedPackage = '';
            AsyncStorage.getItem('user_info', (error, result) => {
                    this.setState({ id: JSON.parse(result).user_id });
                    user = JSON.parse(result);
            });
            const ref = firebase.database().ref(`package-owner/${user.user_id}/notification`);
            ref.on('child_added', (snapshot) => {
                    pickedPackage = snapshot.val();
                    if (pickedPackage.status === 2) {
                        PushNotification.localNotification({
                            title: `Your package: ${pickedPackage.id} has been picked up! `,
                            message: `By shipper ID: ${pickedPackage.shipper_id} \nDestination: ${pickedPackage.destination_address}`,
                            playSound: true,
                            soundName: 'default',
                            userInfo: { id: `${pickedPackage.id}` }
                        });
                        ref.child(`${pickedPackage.id}`).remove();
                    } else {
                        PushNotification.localNotification({
                            title: `Your package: ${pickedPackage.id} has been delivered successfully! `,
                            message: `Destination: ${pickedPackage.destination_address}`,
                            playSound: true,
                            soundName: 'default',
                            userInfo: { id: `${pickedPackage.id}` }
                        });
                        ref.child(`${pickedPackage.id}`).remove();
                    }
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
                        ref={ref => {
                            this.mapRef = ref;
                        }}
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
                        followsUserLocation
                    >
                    {/* {
                        (this.props.arrayMarker.map((item) => {
                            return (
                                <MapView.Marker 
                                    coordinate={item}
                                    pinColor='green' 
                                />
                            );
                        }))
                    } */}
                   
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
