import React from 'react';
import { View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import SearchBox from '../SearchBox';
import SearchResult from '../SearchResults';
import { SubmitButton } from '../common';
import styles from './MapContainerStyle';

const MapContainer = ({
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
                            // pickUpRegion,
                            nextRegion,
                            currentLocation,
                            deleteResultAddress,
                            deleted,
                            navigation
                            }) => {
    // console.log(currentLocation);
    // console.log(region);
    // console.log(nextRegion);
    function getState(c1, c2) {
        let check = c2;
        if (currentLocation.dropOff && deleted === false) {
            check = calculateAverate(c1, c2);
        }
        return check;
    }
    function calculateAverate(c1, c2) {
        return (c1 === null) ? c2 : ((Math.abs(c1) + Math.abs(c2)) / 2);
    }
    function onChangePage() {
        navigation.navigate('PackageRegister');
    }
    console.log(resultTypes);
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                /* ref = {(ref) => {viewMarker(),this.mapRef = ref}}
                onLayout = {()=>{
                    alert("aa"),this.mapRef.fitToCoordinates(arrMarker,{ edgePadding: { top: 10, right: 10, left: 10 }, animated: false})}} */
                 region={{
                    latitude: getState(nextRegion.latitude, region.latitude),
                    longitude: getState(nextRegion.longitude, region.longitude),
                    latitudeDelta: getState(nextRegion.latitudeDelta, region.latitudeDelta),
                    longitudeDelta: getState(nextRegion.longitudeDelta, region.longitudeDelta),
                }} 
                showsUserLocation={true}
            >
            <MapView.Marker 
                coordinate={region}
                pinColor='red' 
            />
            {
                (nextRegion.latitude != null) &&
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
            <SubmitButton onPress={() => onChangePage()}>
               PACKAGE INFORMATION
            </SubmitButton>
            }
        </View> 
    );
};

export default MapContainer;
