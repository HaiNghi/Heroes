export const getTitleColorByType = (type) => {
    var titleColor = '#62bcfa';
    switch(type)
    {
        case 'Delivered':
            titleColor = '#62bcfa';
            break;
        case 'Rejected':
            titleColor = '#b56969';
            break;
        case 'Delivering':
            titleColor = '#6ed3cf';
            break;
    }

    return {
        color: titleColor
    };
};

export const getDeliveringStatusImageResourceURLByType = (type) => {
    var imageResource = '../../images/deliveryStatusIcons/delivering.png';
    switch(type)
    {
        case 'Delivered':
            imageResource = require('../../images/deliveryStatusIcons/delivered.png');
            break;
        case 'Rejected':
            imageResource = require('../../images/deliveryStatusIcons/rejected.png');
            break;
        case 'Delivering':
            imageResource = require('../../images/deliveryStatusIcons/delivering.png');
            break;
    }
    return imageResource;
}