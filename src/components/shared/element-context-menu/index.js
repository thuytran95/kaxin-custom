import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { removeElement } from 'redux-utils/page-builder/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContextMenu from './context-menu';

@connect(
    () => ({}),
    dispatch =>
        bindActionCreators(
            {
                removeElement
            },
            dispatch
        )
)
export default class ContextMenuContainer extends PureComponent {
    static propTypes = {
        element: PropTypes.object.isRequired
    };

    getInitState() {
        return {
            opened: false,
            addingSymbol: false,
            symbolTitle: ''
        };
    }

    openAddingSymbol = () => {
        this.setState({
            addingSymbol: true
        });
    };

    closeAddingSymbol = () => {
        this.setState({
            addingSymbol: false
        });
    };

    onSymbolChange = event => {
        this.setState({
            symbolTitle: event.target.value
        });
    };

    open = () => {
        this.setState({
            opened: true
        });
    };

    close = () => {
        this.setState({
            opened: false
        });
    };

    render() {
        return (
            <ContextMenu
                {...this.props}
                {...this.state}
                open={this.open}
                close={this.close}
                openAddingSymbol={this.openAddingSymbol}
                closeAddingSymbol={this.closeAddingSymbol}
                onSymbolChange={this.onSymbolChange}
            />
        );
    }
}
