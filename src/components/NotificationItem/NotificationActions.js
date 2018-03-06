/* eslint-disable global-require */

export const getTitleColorByType = (type) => {
    let titleColor = '#62bcfa';
    switch (type) {
        case 'Delivered':
            titleColor = '#62bcfa';
            break;
        case 'Rejected':
            titleColor = '#b56969';
            break;
        case 'Delivering':
            titleColor = '#6ed3cf';
            break;
        default:
    }

    return {
        color: titleColor
    };
};

export const getDeliveringStatusImageResourceURLByType = (type) => {
    let imageResource = require('../image/deliveryStatusIcon/delivering.png');
    
    switch (type) {
        case 'Delivered':
            imageResource = require('../image/deliveryStatusIcon/delivered.png');
            break;
        case 'Rejected':
            imageResource = require('../image/deliveryStatusIcon/rejected.png');
            break;
        case 'Delivering':
            imageResource = require('../image/deliveryStatusIcon/delivering.png');
            break;
        default: 
    }
    return imageResource;
};
