// import React from 'react';
import PropTypes from 'prop-types';
import { moneyFormat, getSalePercent } from 'src/helpers/Common';

const PriceComponent = ({ value, format, salePercent }) => {
    if (salePercent > 0) {
        value = getSalePercent(value, salePercent);
    }
    return moneyFormat(value, format);
};

PriceComponent.propTypes = {
    value: PropTypes.number,
    format: PropTypes.string,
    salePercent: PropTypes.number
};
export default PriceComponent;
