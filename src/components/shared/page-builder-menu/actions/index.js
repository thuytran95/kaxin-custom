import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updatePageBuilder } from 'redux-utils/page-builder/actions';

import Actions from './actions';

class ActionsContainer extends PureComponent {
    static propTypes = {
        updatePageBuilder: PropTypes.func.isRequired
    };

    render() {
        const { updatePageBuilder } = this.props;

        return <Actions updatePageBuilder={updatePageBuilder} />;
    }
}

export default connect(null, dispatch =>
    bindActionCreators(
        {
            updatePageBuilder
        },
        dispatch
    )
)(ActionsContainer);
