import { connect } from 'react-redux';

import PackageRegister from '../components/PackageRegister';
import * as Actions from '../actions';
import * as API from '../api/api';

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
        dispatch(Actions.getDistanceMatrix(region, nextRegion));
    },
    getCustomerName: (text) => {
       dispatch(Actions.getCustomerName(text));
    },
    getCustomerPhone: (text) => {
        dispatch(Actions.getCustomerPhone(text));
    },
    getPrice: (height, width, weight, length, distanceMatrix, duration, checkTypeOfPackage) => {
        API.doGetPrice(dispatch, Actions.getPrice, height, width, weight, length, distanceMatrix, duration, checkTypeOfPackage);
    },
    bookPackage: (weight, customerName, customerPhone, 
                    pickUpCoordinate, destinationCoordinate,
                    distanceMatrix, duration,
                    height, width, length, price, checkTypeOfPackage, pickUpLocationAddress, dropOffLocationAddress) => {
        API.doBookPackage(dispatch, Actions.bookPackage, Actions.unload, weight, customerName, customerPhone, 
                        pickUpCoordinate, destinationCoordinate,
                        distanceMatrix, duration,
                        height, width, length, price, checkTypeOfPackage, pickUpLocationAddress, dropOffLocationAddress);
    },
    onDecline: () => {
        dispatch(Actions.bookPackage());
    },
    disablePrice: () => {
        dispatch(Actions.disablePrice());
    },
    getNormalPackage: () => {
        API.doGetNormalPackage(dispatch, Actions.getNormalPackage);
    },
    getOptionalPackage: () => {
        API.doGetOptionalPackage(dispatch, Actions.getOptionalPackage);
    },
    loading: () => {
        dispatch(Actions.loading());
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(PackageRegister);

