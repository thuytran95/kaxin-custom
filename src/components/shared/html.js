import React from 'react';
import PropTypes from 'prop-types';

const Html = ({ value, tag: Tag, ...rest }) => {
    return <Tag dangerouslySetInnerHTML={{ __html: value }} {...rest} />;
};

Html.defaultProps = {
    tag: 'div'
};
Html.propTypes = {
    tag: PropTypes.string,
    value: PropTypes.string
};

export default Html;
