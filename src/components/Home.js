import React, { Component } from 'react';
import { Container } from 'native-base';
import MapContainer from './MapContainer';
import { HeaderForHome } from './common';

class Home extends Component {
    componentDidMount() {
        this.props.getCurrentLocation();
    }

    render() {
        // const region = {
        //     latitude: 16.052917401252717,
        //     longitude: 108.23642190935992,
        //     latitudeDelta: 0.0922,
        //     longitudeDelta: 0.0421
        // }
        return (
            <Container>
                
                <HeaderForHome headerText="Heroes" navigation={this.props.navigation} />
                
                {this.props.region.latitude &&
                    <MapContainer 
                        region={this.props.region} 
                        getInputData={this.props.getInputData} 
                        toogleSearchResult={this.props.toogleSearchResult}
                        getAddressPredictions={this.props.getAddressPredictions}
                        resultTypes={this.props.resultTypes}
                        predictions={this.props.predictions}
                        inputData={this.props.inputData}
                        getSelectedAddress={this.props.getSelectedAddress}
                        getPickUp={this.props.getPickUp}
                        getDropOff={this.props.getDropOff}
                        pickUp={this.props.pickUp}
                        dropOff={this.props.dropOff}
                        pickUpRegion={this.props.pickUpRegion}
                        nextRegion={this.props.nextRegion}
                        currentLocation={this.props.currentLocation}
                        deleteResultAddress={this.props.deleteResultAddress}
                        deleted={this.props.deleted}
                        navigation={this.props.navigation}
                    />
                }
                
            </Container>
        );
    }
}

export default Home;
