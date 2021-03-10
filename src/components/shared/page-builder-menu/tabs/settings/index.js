import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { actions } from 'redux-utils';
import { connect } from 'react-redux';

import Settings from './settings';

@connect(
    state => ({
        selected: state.pageBuilder.selected,
        selectedElement: state.pageBuilder.selectedElement,
        type: state.pageBuilder.type,
        display: 'desktop',
        isTemplate: state.pageBuilder.selectedIsTemplate,
        selectedLinks: state.pageBuilder.selectedLinks || []
    }),
    dispatch => ({
        pageBuilderActions: bindActionCreators(actions.pageBuilderActions, dispatch)
    })
)
export default class SettingsTabContainer extends PureComponent {
    static defaultProps = {
        isTemplate: false
    };
    static propTypes = {
        isTemplate: PropTypes.bool,
        selected: PropTypes.object,
        pageBuilderActions: PropTypes.object
    };

    remove = () => {
        const { removeElement } = this.props.pageBuilderActions;
        const { selected } = this.props;
        removeElement(selected.id, selected.context);
    };

    render() {
        return <Settings {...this.props} remove={this.remove} />;
    }
}
