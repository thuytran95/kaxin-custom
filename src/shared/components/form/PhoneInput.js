import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.us';
import 'cleave.js/dist/addons/cleave-phone.au';
class PhoneInput extends Component {
    onChangeValue = event => {
        const { rawValue } = event.target;
        this.props.onChange(rawValue);
    };
    render() {
        const oldProps = this.props;
        const props = _.omit(oldProps, ['minValue', 'maxValue']);
        return (
            <Cleave
                {...props}
                options={{
                    phone: true,
                    phoneRegionCode: 'AU'
                }}
                onChange={this.onChangeValue}
            />
        );
    }
}

PhoneInput.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default PhoneInput;
