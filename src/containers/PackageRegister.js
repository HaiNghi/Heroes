import { connect } from 'react-redux';

import PackageRegister from '../components/PackageRegister';
import { doBookPackage, doGetPrice, doGetNormalPackage, doGetOptionalPackage } from '../api/api';
import {
    getDistanceMatrix,
    getCustomerName,
    getCustomerPhone,
    bookPackage,
    getPrice,
    disablePrice,
    getNormalPackage,
    getOptionalPackage,
    loading,
    unload
} from '../actions';

const mapStateToProps = (state) => ({
    distanceMatrix: state.package.distanceMatrix,
    duration: state.package.duration,
    customerName: state.package.customerName,
    customerPhone: state.package.customerPhone,
    showSpinner: state.package.showSpinner,
    success: state.package.success,
    showPrice: state.package.showPrice,
    price: state.package.price,
    normalPackageList: state.package.normalPackageList,
    optionalPackageList: state.package.optionalPackageList,
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
    getPrice: (height, width, weight, length, distanceMatrix, duration, checkTypeOfPackage) => {
        doGetPrice(dispatch, getPrice, height, width, weight, length, distanceMatrix, duration, checkTypeOfPackage);
    },
    bookPackage: (weight, customerName, customerPhone, 
                    pickUpCoordinate, destinationCoordinate,
                    distanceMatrix, duration,
                    height, width, length, price, checkTypeOfPackage, pickUpLocationAddress, dropOffLocationAddress) => {
        doBookPackage(dispatch, bookPackage, unload, weight, customerName, customerPhone, 
                        pickUpCoordinate, destinationCoordinate,
                        distanceMatrix, duration,
                        height, width, length, price, checkTypeOfPackage, pickUpLocationAddress, dropOffLocationAddress);
    },
    onDecline: () => {
        dispatch(bookPackage());
    },
    disablePrice: () => {
        dispatch(disablePrice());
    },
    getNormalPackage: () => {
        doGetNormalPackage(dispatch, getNormalPackage);
    },
    getOptionalPackage: () => {
        doGetOptionalPackage(dispatch, getOptionalPackage);
    },
    loading: () => {
        dispatch(loading());
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(PackageRegister);

