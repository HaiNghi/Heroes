import { connect } from 'react-redux';

import PackageRegister from '../components/PackageRegister';
import { doBookPackage } from '../api/api';
import {
    getDistanceMatrix,
    getCustomerName,
    getCustomerPhone,
    bookPackage
} from '../actions';

const mapStateToProps = (state) => ({
    distanceMatrix: state.package.distanceMatrix,
    customerName: state.package.customerName,
    customerPhone: state.package.customerPhone
});

const mapDispatchToProps = (dispatch) => ({
    getDistanceMatrix: (region, nextRegion) => {
        dispatch(getDistanceMatrix(region, nextRegion));
    },
    getCustomerName: (text) => {
       dispatch(getCustomerName(text));
    },
    getCustomerPhone: (text) => {
    dispatch(getCustomerPhone(text));
    },
    bookPackage: (customerName, customerPhone, pickUpCoordinate, destinationCoordinate, distance) => {
        doBookPackage(dispatch, bookPackage, customerName, customerPhone, pickUpCoordinate, destinationCoordinate, distance);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PackageRegister);

