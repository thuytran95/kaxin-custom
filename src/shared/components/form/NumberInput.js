import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Cleave from 'cleave.js/react';

class NumberInput extends Component {
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
                    numeral: true
                }}
                onChange={this.onChangeValue}
            />
        );
    }
}

NumberInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    minValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    maxValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default NumberInput;
