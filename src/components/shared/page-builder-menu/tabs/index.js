import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setMenuTab } from 'redux-utils/page-builder/actions';
import Tabs from './tabs';

class TabsContainer extends PureComponent {
    static propTypes = {
        type: PropTypes.string
    };

    render() {
        return <Tabs {...this.props} />;
    }
}

export default connect(
    ({ pageBuilder }) => ({
        menuTab: pageBuilder.menuTab
    }),
    dispatch => ({ ...bindActionCreators({ setMenuTab }, dispatch) })
)(TabsContainer);
