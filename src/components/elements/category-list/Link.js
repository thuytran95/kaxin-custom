import React from 'react';
import PropTypes from 'prop-types';

const Link = ({ link, isBlank, children }) => {
    return (
        <a href={link} target={isBlank ? '_blank' : '_self'} rel="noreferrer">
            {children}
        </a>
    );
};

Link.propTypes = {
    link: PropTypes.string,
    isBlank: PropTypes.bool,
    children: PropTypes.any
};

export default Link;
