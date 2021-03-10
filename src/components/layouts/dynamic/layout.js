import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class LayoutElement extends PureComponent {
    render() {
        const { Element, editing } = this.props;
        return (
            <Fragment>
                <div>
                    <Element id="Widget" positionInParent={0} editing={editing} />
                </div>
                <Element id="Bottom" positionInParent={0} editing={editing} />
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
