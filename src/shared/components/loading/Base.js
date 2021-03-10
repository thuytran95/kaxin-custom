import PropTypes from 'prop-types';

const BaseLoading = ({ loading, children }) => {
    return loading ? children : null;
};

BaseLoading.defaultProps = {
    loading: false
};

BaseLoading.propTypes = {
    loading: PropTypes.bool,
    children: PropTypes.element.isRequired
};

export default BaseLoading;
