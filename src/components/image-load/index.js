import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

const ImageLoad = ({ src = '', alt = 'Kaixin' }) => (
    <LazyLoad offset={100} once={true}>
        <img src={src} alt={alt} />
    </LazyLoad>
);

ImageLoad.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string
};

export default ImageLoad;
