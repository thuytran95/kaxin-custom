// import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

const moneyFormat = (value, format = '0,0') => {
    return numeral(value).format(format);
};

const PriceComponent = ({ value, format }) => {
    return moneyFormat(value, format);
};

PriceComponent.propTypes = {
    value: PropTypes.number,
    format: PropTypes.string
};
export default PriceComponent;
