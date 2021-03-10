import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import colors from './colors';
import sizes from './sizes';

const Theme = ({ children }) => <ThemeProvider theme={{ colors, sizes }}>{children}</ThemeProvider>;

Theme.propTypes = {
    children: PropTypes.any
};
export default Theme;
