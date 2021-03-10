import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Error403 extends Component {
    render() {
        return (
            <div>
                <h1 className="text-danger">403</h1> Forbidden
            </div>
        );
    }
}

Error403.propTypes = {};

export default Error403;
