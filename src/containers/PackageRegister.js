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
    getOptionalPackage
} from '../actions';

const mapStateToProps = (state) => ({
    distanceMatrix: state.package.distanceMatrix,
    duration: state.package.duration,
    customerName: state.package.customerName,
    customerPhone: state.package.customerPhone,
    success: state.package.success,
    showPrice: state.package.showPrice,
    price: state.package.price,
    normalPackageList: state.package.normalPackageList,
    optionalPackageList: state.package.optionalPackageList
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
                    height, width, length, price, checkTypeOfPackage) => {
        doBookPackage(dispatch, bookPackage, weight, customerName, customerPhone, 
                        pickUpCoordinate, destinationCoordinate,
                        distanceMatrix, duration,
                        height, width, length, price, checkTypeOfPackage);
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
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(PackageRegister);

