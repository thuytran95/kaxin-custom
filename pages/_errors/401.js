import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class ErrorPage extends Component {
    render() {
        return (
            <div>
                <h1 className="text-danger">401</h1> Unauthorized
            </div>
        );
    }
}

ErrorPage.propTypes = {};

export default ErrorPage;
