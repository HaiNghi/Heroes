import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000';
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
                        duration: duration,
                        size: packageSize,
                        note: 'string',
                        price: price,
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
                        duration: duration,
                        note: 'string',
                        price: price,
                        pickup_location_address: pickUpLocationAddress,
                        destination_address: dropOffLocationAddress 
                };
                console.log('normal', variableParams);
        }
        console.log(pickUpLocation, destinationLocation);
        axios.post(`${baseURL}/api/requestShips`, 
                variableParams
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
                alert(error.message);
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
                        duration: duration
                };
        } else {
                variableParams = {
                        package_type_id: weight,
                        distance: distanceMatrix,
                        duration: duration
                }; 
        }
        
        console.log(packageSize);
        axios.get(`${baseURL}/api/requestShips/packageFare`, {
                params: variableParams
        })
        .then((response) => {
                console.log(response);
                dispatch(getPrice(response.data.price.toFixed(0)));
        })
        .catch((error) => {
                alert(error.message);
        });                        
};

export const doGetNormalPackage = (dispatch, getNormalPackage) => {
        axios.get(`${baseURL}/api/packageTypes/normal`)
        .then((response) => {
                console.log(response.data.data);
                dispatch(getNormalPackage(response.data.data));
        })
        .catch((error) => {
                alert(error.message);
        });   
};

export const doGetOptionalPackage = (dispatch, getOptionalPackage) => {
        axios.get(`${baseURL}/api/packageTypes/optional`)
        .then((response) => {
                console.log(response.data.data);
                dispatch(getOptionalPackage(response.data.data));
        })
        .catch((error) => {
                alert(error.message);
        });   
};
