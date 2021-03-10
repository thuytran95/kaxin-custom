import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Wrap } from './styled';
class LayoutElement extends PureComponent {
    render() {
        const { Element, editing } = this.props;
        return (
            <Fragment>
                <Wrap>
                    <div style={{ flex: 2 }} />
                    <div style={{ flex: 8 }}>
                        <Element id="LeftSide" positionInParent={0} editing={editing} />
                    </div>
                </Wrap>
                <Element id="Bottom" positionInParent={0} editing={editing} />
                <Element id="Panel" positionInParent={0} editing={editing} />
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
