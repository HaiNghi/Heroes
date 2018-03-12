import React, { Component } from 'react';
import { Container, Image } from 'native-base';
import MapContainer from './MapContainer';
import { HeaderForHome } from './common';

class Home extends Component {
    
    componentDidMount() {
        this.props.getCurrentLocation();
        console.log("OK");
    } 

    render() {
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
