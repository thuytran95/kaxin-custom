import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrMessage extends Component {
    render() {
        const { name, obj } = this.props;
        const text = obj[name] === undefined ? '' : obj[name];
        return (
            <div>
                <p className=" mt-2 text-danger">
                    <small>
                        <em>{text}</em>
                    </small>
                </p>
            </div>
        );
    }
}

ErrMessage.propTypes = {
    name: PropTypes.string,
    obj: PropTypes.object
};

export default ErrMessage;
