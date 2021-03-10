import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

//import { Wrap } from './styled';
class LayoutElement extends PureComponent {
    render() {
        const { Element, editing } = this.props;
        return (
            <Fragment>
                <Element id="BlockHome" positionInParent={0} editing={editing} />
            </Fragment>
        );
    }
}

LayoutElement.propTypes = {
    editing: PropTypes.bool,
    Element: PropTypes.func
};

const mapStateToProps = ({ pageBuilder }) => {
    const { editing } = pageBuilder;
    return { editing };
};

export default connect(mapStateToProps)(LayoutElement);
