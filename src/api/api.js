import { AsyncStorage, Alert } from 'react-native';
import axios from 'axios';

// const baseURL = 'http://127.0.0.1:8000';
// const baseURL = 'http://192.168.21.181:8000';
const baseURL = 'http://ec2-34-231-21-217.compute-1.amazonaws.com:8000';
let user = [];
AsyncStorage.getItem('user_info', (error, result) => {
        user = JSON.parse(result);
});
// const baseURL = 'http://ec2-34-231-21-217.compute-1.amazonaws.com:8000';
export const processLogin = (dispatch, loginSuccess, loginFail, loadSpinner, email, password) => {
        axios.post(`${baseURL}/api/login`, {
                email,
                password
        }).then((response) => {
                console.log(response);
                switch (response.data.data.role_id) {
                        case 3: {
                                AsyncStorage.setItem('user_info', JSON.stringify(response.data.data));
                                dispatch(loginSuccess());
                                break;
                        }
                        default: {
                                dispatch(loginFail('Unauthentication'));
                        }
                }
        }).catch((error) => {
                dispatch(loginFail(error.response.status));
                console.log(error.response);
        });
};

export const doBookPackage = (dispatch, bookPackage, unload,
                                weight, customerName, customerPhone, 
                                pickUpCoordinate, destinationCoordinate,
                                distanceMatrix, duration,
                                height, width, length, price, checkTypeOfPackage, pickUpLocationAddress, dropOffLocationAddress) => {
        // console.log(customerName, customerPhone, pickUpCoordinate, destinationCoordinate, distance);
        
        const pickUpLocation = `{"latitude":${pickUpCoordinate.latitude},"longitude":${pickUpCoordinate.longitude}}`;
        const destinationLocation = `{"latitude":${destinationCoordinate.latitude},"longitude":${destinationCoordinate.longitude}}`;
        let packageSize = '';
        let variableParams = {};
        if (checkTypeOfPackage === 'optional') {
                packageSize = `{"length": ${length}, "width": ${width}, "height": ${height}}`;
                variableParams = {
                        authentication_token: 'abcedsdfs',
                        package_type_id: weight,
                        promo_code_id: 1,
                        receiver_name: customerName,
                        receiver_phone: customerPhone,
                        pickup_location: pickUpLocation,
                        destination: destinationLocation,
                        distance: distanceMatrix,
                        duration,
                        size: packageSize,
                        note: 'string',
                        price,
                        pickup_location_address: pickUpLocationAddress,
                        destination_address: dropOffLocationAddress 
                };
                console.log('optional', variableParams);
        } else {
                variableParams = {
                        authentication_token: 'abcedsdfs',
                        package_type_id: weight,
                        promo_code_id: 1,
                        receiver_name: customerName,
                        receiver_phone: customerPhone,
                        pickup_location: pickUpLocation,
                        destination: destinationLocation,
                        distance: distanceMatrix,
                        duration,
                        note: 'string',
                        price,
                        pickup_location_address: pickUpLocationAddress,
                        destination_address: dropOffLocationAddress 
                };
                console.log('normal', variableParams);
        }
        console.log(pickUpLocation, destinationLocation);
        axios.post(`${baseURL}/api/requestShips`, 
                variableParams, {
                        headers: { Authorization: `Bearer ${user.token}` } 
                }
        )
        .then((response) => {
                if (response.status === 201) {
                     dispatch(unload());
                     setTimeout(() => dispatch(bookPackage()), 1000);
                //      dispatch(bookPackage());
                } else {
                     console.log(response);
                }
        })
        .catch((error) => {
                Alert.alert(error.message);
        });
};

export const doGetPrice = (dispatch, getPrice, height, width, weight, 
                        length, distanceMatrix, duration, checkTypeOfPackage) => {
        console.log(height, width, weight, length, distanceMatrix, duration);
        console.log(checkTypeOfPackage);
        let packageSize = '';
        let variableParams = {};
        if (checkTypeOfPackage === 'optional') {
                packageSize = `{"length": ${length}, "width": ${width}, "height": ${height}}`;
                variableParams = {
                        package_type_id: weight,
                        size: packageSize,
                        distance: distanceMatrix,
                        duration
                };
        } else {
                variableParams = {
                        package_type_id: weight,
                        distance: distanceMatrix,
                        duration
                }; 
        }
        
        console.log(packageSize);
        axios.get(`${baseURL}/api/requestShips/packageFare`, 
                { params: variableParams, 
                headers: { Authorization: `Bearer ${user.token}` } }
        )
        .then((response) => {
                console.log(response);
                dispatch(getPrice(response.data.price.toFixed(0)));
        })
        .catch((error) => {
                Alert.alert(error.message);
        });                        
};

export const doGetNormalPackage = (dispatch, getNormalPackage) => {
        axios.get(`${baseURL}/api/packageTypes/normal`, {
                headers: { Authorization: `Bearer ${user.token}` } 
        })
        .then((response) => {
                console.log(response.data.data);
                dispatch(getNormalPackage(response.data.data));
        })
        .catch((error) => {
                Alert.alert(error.message);
        });   
};

export const doGetOptionalPackage = (dispatch, getOptionalPackage) => {
        axios.get(`${baseURL}/api/packageTypes/optional`, {
                headers: { Authorization: `Bearer ${user.token}` } 
        })
        .then((response) => {
                console.log(response.data.data);
                dispatch(getOptionalPackage(response.data.data));
        })
        .catch((error) => {
                Alert.alert(error.message);
        });   
};
export const processVerifyingOTPCode = (dispatch, verifyCodeResult, code, packageId) => {
        axios.put(`${baseURL}/api/packageOwner/trip/${packageId}`, 
        { otp_code: code }, 
        { headers: { Authorization: `Bearer ${user.token}` }
        }).then((response) => {
                console.log(response);
                dispatch(verifyCodeResult(response.data.message, 'success'));
        }).catch((error) => {
                dispatch(verifyCodeResult(error.response.data.message, 'fail'));
                console.log(error.response);
        });
};

export const processGettingHistoryList = (dispatch, getHistoryList) => {
        axios.get(`${baseURL}/api/packageOwner/trip`, {
                headers: { Authorization: `Bearer ${user.token}` } 
        })
        .then((response) => {
                console.log(response.data.data);
                dispatch(getHistoryList(response.data.data));
        })
        .catch((error) => {
                Alert.alert(error.message);
        });   
};

export const processGettingHistoryDetail = (dispatch, getHistoryDetail, id) => {
        axios.get(`${baseURL}/api/packageOwner/trip/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` } 
        })
        .then((response) => {
                console.log(response.data.data);
                dispatch(getHistoryDetail(response.data.data));
        })
        .catch((error) => {
                Alert.alert(error.message);
        });   
};
