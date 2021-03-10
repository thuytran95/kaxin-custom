import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { Rate } from 'antd';

class RatingComponent extends PureComponent {
    render() {
        return <Rate character={<i className="zmdi zmdi-star" />} {...this.props} />;
    }
}

RatingComponent.propTypes = {};

export default RatingComponent;
